import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Inicializa o Firebase Admin SDK
admin.initializeApp();

/**
 * Função HTTP chamada pelo frontend para calcular KPIs personalizados.
 * Exemplo de uso: calcular taxa de conversão, valor médio por lead, etc.
 */
export const calculateCustomKPI = functions.https.onCall(async (data, context) => {
  // 🔒 Garante que o usuário está autenticado
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado');
  }

  const { kpiType, partnerId = context.auth.uid } = data;
  const db = admin.firestore();

  // ✅ Exemplo: Calcular taxa de conversão (%)
  if (kpiType === 'conversionRate') {
    const partnerRef = db.collection('partners').doc(partnerId);
    const partnerDoc = await partnerRef.get();
    
    if (!partnerDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Parceiro não encontrado');
    }

    const partnerData = partnerDoc.data();
    const clicks = partnerData?.metrics?.clicks || 0;
    const conversions = partnerData?.metrics?.conversions || 0;

    const rate = clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00';

    return {
      kpiType: 'conversionRate',
      label: 'Taxa de Conversão',
      value: `${rate}%`,
      description: 'Percentual de leads convertidos em vendas'
    };
  }

  // ✅ Adicione mais KPIs aqui conforme necessário:
  // - averageLeadValue
  // - roiComparison
  // - clickThroughRate

  // ❌ KPI não suportado
  throw new functions.https.HttpsError('invalid-argument', `KPI "${kpiType}" não suportado`);
});
