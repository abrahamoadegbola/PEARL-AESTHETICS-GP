import { useEffect, useState } from "react";
import { getGoogleReviews } from "../lib/api";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import BUSINESS from "../data/business";

const FALLBACK = {
  rating: BUSINESS.google.rating,
  userRatingCount: null,
  reviews: BUSINESS.testimonials,
  live: false,
};

// Returns { rating, userRatingCount, reviews, live }. `reviews` share the
// testimonial shape ({ quote, name, source, rating, ... }) so components
// don't care whether they came from Google live or from business.js.
export default function useGoogleReviews() {
  const [state, setState] = useState(FALLBACK);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    getGoogleReviews()
      .then((data) => {
        if (cancelled || !Array.isArray(data?.reviews) || data.reviews.length === 0) return;
        setState({
          rating: data.rating ?? FALLBACK.rating,
          userRatingCount: data.userRatingCount ?? null,
          reviews: data.reviews,
          live: true,
        });
      })
      .catch(() => {
        // Function not deployed / no API key yet - keep the saved reviews.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
