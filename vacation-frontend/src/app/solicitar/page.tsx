'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Calendar from '@/components/Calendar';
import { calendarApi, vacationsApi, employeesApi } from '@/lib/api';
import { Holiday, TipoLicencia, Balance } from '@/types';
import { format, addDays } from 'date-fns';

export default function SolicitarPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [tipoLicencia, setTipoLicencia] = useState<TipoLicencia>(TipoLicencia.VACACIONES);
  const [motivo, setMotivo] = useState('');
  const [diasCalculados, setDiasCalculados] = useState<number | null>(null);

  const minDate = addDays(new Date(), 15);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (token) {
      Promise.all([
        calendarApi.getHolidays(new Date().getFullYear(), token),
        calendarApi.getHolidays(new Date().getFullYear() + 1, token),
        employeesApi.getBalance(token),
      ])
        .then(([holidays1, holidays2, balanceData]) => {
          setHolidays([...holidays1, ...holidays2]);
          setBalance(balanceData);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [token]);

  useEffect(() => {
    if (selectedStart && selectedEnd && token) {
      calendarApi
        .checkDates(
          format(selectedStart, 'yyyy-MM-dd'),
          format(selectedEnd, 'yyyy-MM-dd'),
          token
        )
        .then((result) => setDiasCalculados(result.diasHabiles))
        .catch(console.error);
    } else {
      setDiasCalculados(null);
    }
  }, [selectedStart, selectedEnd, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStart || !selectedEnd || !token) return;

    setError('');
    setSubmitting(true);

    try {
      await vacationsApi.create(
        {
          fechaInicio: format(selectedStart, 'yyyy-MM-dd'),
          fechaFin: format(selectedEnd, 'yyyy-MM-dd'),
          tipoLicencia,
          motivo: motivo || undefined,
        },
        token
      );
      setSuccess(true);
      setTimeout(() => router.push('/mis-solicitudes'), 2000);
    } catch (err: any) {
      setError(err.message || 'Error al crear la solicitud');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tiposLicencia = [
    { value: TipoLicencia.VACACIONES, label: 'Vacaciones' },
    { value: TipoLicencia.MATERNIDAD, label: 'Maternidad' },
    { value: TipoLicencia.PATERNIDAD, label: 'Paternidad' },
    { value: TipoLicencia.INCAPACIDAD, label: 'Incapacidad' },
    { value: TipoLicencia.ADOPCION, label: 'Adopción' },
    { value: TipoLicencia.LUTO, label: 'Luto' },
    { value: TipoLicencia.MATRIMONIO, label: 'Matrimonio' },
    { value: TipoLicencia.OTRO, label: 'Otro' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Solicitar Vacaciones</h1>

        {success ? (
          <div className="card text-center py-12">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Solicitud Enviada</h2>
            <p className="text-gray-600">Tu solicitud ha sido enviada a Recursos Humanos para su revisión.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendario */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Selecciona las fechas</h2>
              <Calendar
                holidays={holidays}
                selectedStart={selectedStart}
                selectedEnd={selectedEnd}
                onSelectStart={setSelectedStart}
                onSelectEnd={setSelectedEnd}
                minDate={minDate}
              />
              <p className="text-sm text-gray-500 mt-2">
                * Las solicitudes deben hacerse con al menos 15 días de anticipación
              </p>
            </div>

            {/* Formulario */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalles de la solicitud</h2>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Días disponibles:</span>
                    <span className="font-semibold text-blue-600">{balance?.diasDisponibles || 0}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fechas seleccionadas
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedStart && selectedEnd ? (
                      <div className="flex justify-between">
                        <span>
                          {format(selectedStart, 'dd/MM/yyyy')} - {format(selectedEnd, 'dd/MM/yyyy')}
                        </span>
                        <span className="font-semibold text-blue-600">
                          {diasCalculados !== null ? `${diasCalculados} días hábiles` : 'Calculando...'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Selecciona las fechas en el calendario</span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de licencia
                  </label>
                  <select
                    id="tipo"
                    value={tipoLicencia}
                    onChange={(e) => setTipoLicencia(e.target.value as TipoLicencia)}
                    className="input"
                  >
                    {tiposLicencia.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 mb-1">
                    Motivo (opcional)
                  </label>
                  <textarea
                    id="motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="input min-h-[100px]"
                    placeholder="Describe el motivo de tu solicitud..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedStart || !selectedEnd || submitting}
                  className="btn-primary w-full py-3 font-semibold"
                >
                  {submitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
