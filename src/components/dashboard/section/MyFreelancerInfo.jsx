"use client";
import React, { useEffect, useState } from "react";
import FreelancerDetails2 from "@/components/section/FreelancerDetails2";

export default function MyFreelancerInfo() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/me", { cache: "no-store" });
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d?.ok) throw new Error("ME_FETCH_FAILED");
        if (alive) setUser(d.data);
      } catch (e) {
        if (alive) setError("שגיאה בטעינת הפרופיל");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className='ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative hover-bgc-color'>
      <div className='bdrb1 pb15 mb25'>
        <h2 className='list-title'>הפרופיל שלי</h2>
      </div>
      {loading ? (
        <div className='py-4 text-center'>
          <span className='spinner-border' />
        </div>
      ) : error ? (
        <div className='alert alert-danger mb0'>{error}</div>
      ) : (
        <FreelancerDetails2 user={user} />
      )}
    </div>
  );
}
