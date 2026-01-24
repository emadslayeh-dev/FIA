"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function MobileNavigation6() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/me", { cache: "no-store" });
        if (!r.ok) return;
        const d = await r.json().catch(() => ({}));
        if (d?.ok && alive) setUser(d.data);
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const resp = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!resp.ok) console.warn("MobileNavigation6 logout not ok", resp.status);
    } catch {}
    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }
    } catch {}
    router.push("/login");
    router.refresh();
  }, [router]);
  return (
    <>
      <div className='mobilie_header_nav stylehome1'>
        <div className='mobile-menu'>
          <div className='header bdrb1'>
            <div className='menu_and_widgets'>
              <div className='mobile_menu_bar d-flex justify-content-between align-items-center'>
                <Link className='mobile_logo' href='/'>
                  <Image height={60} width={143} src='/images/HEADER-LOGO-FIA.png' alt='Header Logo' />
                </Link>
                <div className='right-side text-end'>
                  {!user ? (
                    <>
                      <Link href='/login'>התחברו</Link>
                      <Link className='ml15' href='/register'>
                        הרשמה
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href='/dashboard'>אזור אישי</Link>
                      <a className='ml15' onClick={handleLogout}>
                        התנתק
                      </a>
                    </>
                  )}
                  <a
                    className='menubar ml30'
                    data-bs-toggle='offcanvas'
                    data-bs-target='#offcanvasExample'
                    aria-controls='offcanvasExample'>
                    <Image height={20} width={20} src='/images/mobile-dark-nav-icon.svg' alt='icon' />
                  </a>
                </div>
              </div>
            </div>
            <div className='posr'>
              <div className='mobile_menu_close_btn'>
                <span className='far fa-times' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
