'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { vacationsApi } from '@/lib/api';
import { VacationRequest } from '@/types';

export default function MisSolicitudesPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<VacationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (token) {
      vacationsApi
        .getMyRequests(token)
        .then(setRequests)
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

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      vacaciones: 'Vacaciones',
      maternidad: 'Maternidad',
      paternidad: 'Paternidad',
      incapacidad: 'Incapacidad',
      adopcion: 'Adopción',
      luto: 'Luto',
      matrimonio: 'Matrimonio',
      otro: 'Otro',
    };
    return labels[tipo] || tipo;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Solicitudes</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-4">No tienes solicitudes registradas</p>
            <button
              onClick={() => router.push('/solicitar')}
              className="btn-primary"
            >
              Crear primera solicitud
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {getTipoLabel(request.tipoLicencia)}
                      </h3>
                      {getStatusBadge(request.estado)}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Fechas:</span>{' '}
                        {new Date(request.fechaInicio).toLocaleDateString('es-MX')} -{' '}
                        {new Date(request.fechaFin).toLocaleDateString('es-MX')}
                      </p>
                      <p>
                        <span className="font-medium">Días solicitados:</span>{' '}
                        {request.diasSolicitados}
                      </p>
                      {request.motivo && (
                        <p>
                          <span className="font-medium">Motivo:</span> {request.motivo}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        Solicitado el{' '}
                        {new Date(request.createdAt).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {request.estado === 'aprobada' && request.fechaAprobacion && (
                    <div className="bg-green-50 px-4 py-3 rounded-lg text-sm">
                      <p className="text-green-700">
                        Aprobada el{' '}
                        {new Date(request.fechaAprobacion).toLocaleDateString('es-MX')}
                      </p>
                      {request.comentariosRh && (
                        <p className="text-green-600 mt-1">"{request.comentariosRh}"</p>
                      )}
                    </div>
                  )}

                  {request.estado === 'rechazada' && (
                    <div className="bg-red-50 px-4 py-3 rounded-lg text-sm">
                      <p className="text-red-700">Solicitud rechazada</p>
                      {request.comentariosRh && (
                        <p className="text-red-600 mt-1">"{request.comentariosRh}"</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
