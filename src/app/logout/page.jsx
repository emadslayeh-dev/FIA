"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let done = false;
    (async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
      } catch {}
      try {
        if (typeof window !== "undefined") {
          localStorage.clear();
          sessionStorage.clear();
          window.dispatchEvent(new Event("fia-logout"));
        }
      } catch {}
      if (!done) {
        router.replace("/login");
        router.refresh();
      }
    })();
    return () => {
      done = true;
    };
  }, [router]);

  return (
    <div className='container py-5 text-center'>
      <div className='spinner-border me-2' role='status' aria-hidden='true' />
      <span>מתנתק...</span>
    </div>
  );
}
