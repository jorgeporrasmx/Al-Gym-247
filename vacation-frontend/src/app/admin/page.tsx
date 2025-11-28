'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { vacationsApi } from '@/lib/api';
import { VacationRequest } from '@/types';

export default function AdminPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [pendingRequests, setPendingRequests] = useState<VacationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [comentarios, setComentarios] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (!authLoading && user && !user.esAdmin) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (token && user?.esAdmin) {
      loadPendingRequests();
    }
  }, [token, user]);

  const loadPendingRequests = () => {
    if (!token) return;
    setLoading(true);
    vacationsApi
      .getPending(token)
      .then(setPendingRequests)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleApprove = async (id: string) => {
    if (!token) return;
    setProcessingId(id);
    try {
      await vacationsApi.approve(id, comentarios[id] || '', token);
      loadPendingRequests();
    } catch (error) {
      console.error('Error approving:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!token) return;
    setProcessingId(id);
    try {
      await vacationsApi.reject(id, comentarios[id] || '', token);
      loadPendingRequests();
    } catch (error) {
      console.error('Error rejecting:', error);
    } finally {
      setProcessingId(null);
    }
  };

  if (authLoading || !user || !user.esAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Recursos Humanos</h1>
          <span className="badge-pending text-sm">
            {pendingRequests.length} solicitudes pendientes
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : pendingRequests.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">No hay solicitudes pendientes de revisión</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingRequests.map((request) => (
              <div key={request.id} className="card">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Info del empleado y solicitud */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {request.employee?.nombre?.charAt(0) || 'E'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {request.employee?.nombre} {request.employee?.apellidos}
                        </h3>
                        <p className="text-sm text-gray-500">{request.employee?.email}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tipo:</span>
                        <span className="font-medium">{getTipoLabel(request.tipoLicencia)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fechas:</span>
                        <span className="font-medium">
                          {new Date(request.fechaInicio).toLocaleDateString('es-MX')} -{' '}
                          {new Date(request.fechaFin).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Días solicitados:</span>
                        <span className="font-medium">{request.diasSolicitados}</span>
                      </div>
                      {request.motivo && (
                        <div className="pt-2 border-t">
                          <span className="text-sm text-gray-600">Motivo:</span>
                          <p className="text-sm mt-1">{request.motivo}</p>
                        </div>
                      )}
                      <div className="text-xs text-gray-400 pt-2">
                        Solicitado el{' '}
                        {new Date(request.createdAt).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="lg:w-80 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comentarios (opcional)
                      </label>
                      <textarea
                        value={comentarios[request.id] || ''}
                        onChange={(e) =>
                          setComentarios({ ...comentarios, [request.id]: e.target.value })
                        }
                        className="input min-h-[80px]"
                        placeholder="Agregar comentarios..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={processingId === request.id}
                        className="btn-success flex-1"
                      >
                        {processingId === request.id ? 'Procesando...' : 'Aprobar'}
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={processingId === request.id}
                        className="btn-danger flex-1"
                      >
                        {processingId === request.id ? 'Procesando...' : 'Rechazar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
