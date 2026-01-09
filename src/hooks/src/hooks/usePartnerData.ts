'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type PartnerData = {
  subscription: {
    status: 'trial' | 'ativo' | 'inativo';
    nextBilling?: string;
    trialStart?: string;
    trialEnds?: string;
  };
  metrics: {
    views: number;
    clicks: number;
    conversions: number;
    roi: number;
  };
  gamification: {
    level: number;
    xp: number;
    achievements: string[];
    weeklyRank: number;
  };
};

export function usePartnerData() {
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const partnerRef = doc(db, 'partners', user.uid);
        const unsubscribeData = onSnapshot(
          partnerRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setData(docSnap.data() as PartnerData);
            }
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
        return () => unsubscribeData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return { data, loading, error };
}
