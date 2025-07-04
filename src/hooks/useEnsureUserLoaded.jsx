import { useEffect } from "react";
import { useSelector } from "react-redux";

function useEnsureUserLoaded() {
  const { status, userData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && status && !userData) {
      console.warn("User is authenticated but userData is missing. Reloading...");
      window.location.reload();
    }
  }, [status, userData, loading]);
}

export default useEnsureUserLoaded;
