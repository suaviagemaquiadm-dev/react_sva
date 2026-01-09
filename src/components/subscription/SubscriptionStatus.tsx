'use client';

import { usePartnerData } from '@/hooks/usePartnerData';
import { addDays, format } from 'date-fns';

export default function SubscriptionStatus() {
  const { data, loading } = usePartnerData();

  if (loading) return <div className="bg-gray-100 p-4 rounded">Carregando status...</div>;
  if (!data) return null;

  const { status, trialStart, trialEnds } = data.subscription;

  const trialStartDate = trialStart ? new Date(trialStart) : null;
  const sevenDaysLater = trialStartDate ? addDays(trialStartDate, 7) : null;
  const today = new Date();
  const isGuaranteeActive = status === 'trial' && sevenDaysLater && today <= sevenDaysLater;

  switch (status) {
    case 'trial':
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="font-bold text-yellow-800">✅ Garantia Ativa</p>
          <p className="text-sm">
            {isGuaranteeActive 
              ? "Você tem direito a 1 lead qualificado em 7 dias. Se não receber, reembolso automático."
              : "Período de garantia expirado."}
          </p>
          {trialEnds && <p className="text-xs mt-1">Trial termina em: {format(new Date(trialEnds), 'dd/MM/yyyy')}</p>}
        </div>
      );
    case 'ativo':
      return (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="font-bold text-green-800">✅ Assinatura Ativa</p>
          <p className="text-sm">Seu plano está renovando automaticamente.</p>
        </div>
      );
    case 'inativo':
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="font-bold text-red-800">⚠️ Assinatura Inativa</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
            Reativar Agora
          </button>
        </div>
      );
    default:
      return null;
  }
}
