import { useCallback, useEffect, useState } from "react";
import { subscribe } from "../lib/db";

// Wraps an async getter (e.g. getProducts, getBookings, getOrders) so the
// component fetches on mount, re-fetches whenever the underlying Supabase
// tables change (via realtime), and exposes loading/error state so pages
// can show something better than a blank screen while data loads or if
// Supabase isn't configured yet.
//
// Returns [data, { loading, error, refresh }]. `data` defaults to [] so
// callers can .map() it immediately without a null check.
export default function useDbCollection(getter) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    getter()
      .then((result) => {
        setData(result || []);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();
    const unsubscribe = subscribe(refresh);
    return unsubscribe;
  }, [refresh]);

  return [data, { loading, error, refresh, setData }];
}
