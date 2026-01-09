'use client';

import { usePartnerData } from '@/hooks/usePartnerData';
import SubscriptionStatus from '@/components/subscription/SubscriptionStatus';
import MetricCard from '@/components/kpis/MetricCard';
import XpBar from '@/components/gamification/XpBar';

export default function PartnerDashboard() {
  const { data, loading } = usePartnerData();

  if (loading) return <div className="p-8">Carregando dashboard...</div>;
  if (!data) return <div className="p-8">Acesso negado.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard do Parceiro</h1>
      
      <SubscriptionStatus />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <MetricCard title="Visualizações" value={data.metrics.views} />
        <MetricCard title="Cliques" value={data.metrics.clicks} />
        <MetricCard title="Conversões" value={data.metrics.conversions} />
        <MetricCard title="ROI Estimado" value={`R$ ${data.metrics.roi}`} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Seu Progresso</h2>
        <XpBar level={data.gamification.level} xp={data.gamification.xp} />
      </div>
    </div>
  );
}
