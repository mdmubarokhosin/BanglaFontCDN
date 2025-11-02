
'use client';
import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, type DocumentReference, type DocumentData } from 'firebase/firestore';

export function useDoc<T extends DocumentData>(
  ref: DocumentReference<T> | null,
  initialData?: T
): { data: T; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T>(initialData as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refPath = useMemo(() => ref?.path, [ref]);

  useEffect(() => {
    if (!refPath || !ref) {
      setData(initialData as T);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          const docData = {
            id: snapshot.id,
            ...snapshot.data(),
          } as T;
          setData(docData);
        } else {
            setData(initialData as T); // or handle non-existence
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [refPath, ref, initialData]);

  return { data, loading, error };
}
