'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { employeesApi, vacationsApi, calendarApi } from '@/lib/api';
import { Balance, VacationRequest, Holiday } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState<Balance | null>(null);
  const [recentRequests, setRecentRequests] = useState<VacationRequest[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (token) {
      Promise.all([
        employeesApi.getBalance(token),
        vacationsApi.getMyRequests(token),
        calendarApi.getHolidays(new Date().getFullYear(), token),
      ])
        .then(([balanceData, requests, holidaysData]) => {
          setBalance(balanceData);
          setRecentRequests(requests.slice(0, 5));
          setHolidays(holidaysData);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [token]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <span className="badge-pending">Pendiente</span>;
      case 'aprobada':
        return <span className="badge-approved">Aprobada</span>;
      case 'rechazada':
        return <span className="badge-rejected">Rechazada</span>;
      case 'cancelada':
        return <span className="badge-cancelled">Cancelada</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Bienvenido, {user.nombre}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance de días */}
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Días Disponibles</h3>
            <p className="text-4xl font-bold text-blue-600">
              {loading ? '...' : balance?.diasDisponibles}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              de {balance?.diasTotales} días totales
            </p>
          </div>

          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Días Usados</h3>
            <p className="text-4xl font-bold text-gray-800">
              {loading ? '...' : balance?.diasUsados}
            </p>
            <p className="text-sm text-gray-500 mt-1">este año</p>
          </div>

          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Antigüedad</h3>
            <p className="text-4xl font-bold text-green-600">
              {loading ? '...' : balance?.antiguedad}
            </p>
            <p className="text-sm text-gray-500 mt-1">años en la empresa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Acciones rápidas */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <Link
                href="/solicitar"
                className="block w-full btn-primary text-center py-3"
              >
                Solicitar Vacaciones
              </Link>
              <Link
                href="/mis-solicitudes"
                className="block w-full btn-secondary text-center py-3"
              >
                Ver Mis Solicitudes
              </Link>
            </div>
          </div>

          {/* Próximos días festivos */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximos Días Festivos</h2>
            {loading ? (
              <p className="text-gray-500">Cargando...</p>
            ) : holidays.length > 0 ? (
              <ul className="space-y-2">
                {holidays
                  .filter((h) => new Date(h.fecha) >= new Date())
                  .slice(0, 5)
                  .map((holiday) => (
                    <li key={holiday.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium">{holiday.nombre}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(holiday.fecha).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay días festivos próximos</p>
            )}
          </div>
        </div>

        {/* Solicitudes recientes */}
        <div className="card mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Solicitudes Recientes</h2>
            <Link href="/mis-solicitudes" className="text-blue-600 hover:text-blue-700 text-sm">
              Ver todas
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : recentRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Tipo</th>
                    <th className="pb-3">Fechas</th>
                    <th className="pb-3">Días</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request) => (
                    <tr key={request.id} className="border-b last:border-0">
                      <td className="py-3 capitalize">{request.tipoLicencia}</td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(request.fechaInicio).toLocaleDateString('es-MX')} -{' '}
                        {new Date(request.fechaFin).toLocaleDateString('es-MX')}
                      </td>
                      <td className="py-3">{request.diasSolicitados}</td>
                      <td className="py-3">{getStatusBadge(request.estado)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No tienes solicitudes aún</p>
          )}
        </div>
      </main>
    </div>
  );
}
