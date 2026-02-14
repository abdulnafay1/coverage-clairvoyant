import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function usePageTransition(delay = 800) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const navigateWithLoader = useCallback(
    (to: string) => {
      setLoading(true);
      setTimeout(() => {
        navigate(to);
        setLoading(false);
      }, delay);
    },
    [navigate, delay]
  );

  return { loading, navigateWithLoader };
}
