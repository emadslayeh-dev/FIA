"use client";

import Link from "next/link";
import Image from "next/image";
import MobileNavigation6 from "./MobileNavigation6";
import Navigation from "./Navigation";
import Mega from "./Mega";
import useStickyMenu from "@/hook/useStickyMenu";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header7() {
  const sticky = useStickyMenu(50);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [goingDashboard, setGoingDashboard] = useState(false);
  const router = useRouter();
  const path = usePathname();

  // צבע דינמי: לבן בעמוד הבית כשלא sticky, שחור בכל מצב אחר
  const isHomePage = path === "/";
  const textColor = isHomePage && !sticky ? "#ffffff" : "#000000";

  // Fetch user on initial mount and whenever path changes
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/me", { cache: "no-store" });
        if (!r.ok) {
          if (alive) setUser(null);
          return;
        }
        const d = await r.json().catch(() => ({}));
        if (d?.ok && alive) setUser(d.data);
        else if (alive) setUser(null);
      } catch {
        if (alive) setUser(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [path]);

  // Listen for global logout event to clear local user state immediately
  useEffect(() => {
    const handler = () => setUser(null);
    if (typeof window !== "undefined") window.addEventListener("fia-logout", handler);
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("fia-logout", handler);
    };
  }, []);

  const handleLogout = useCallback(async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const resp = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!resp.ok) console.warn("Header7 logout not ok", resp.status);
    } catch (e) {
      console.warn("Header7 logout failed", e);
    }
    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
        window.dispatchEvent(new Event("fia-logout"));
      }
    } catch {}
    router.push("/login");
    router.refresh();
    // No need to unset loggingOut; we'll navigate away
  }, [router, loggingOut]);

  return (
    <>
      <header
        className={`header-nav  nav-homepage-style at-home3  stricky main-menu border-0 animated ${
          sticky ? "slideInDown stricky-fixed" : "slideIn"
        }`}>
        <nav className='posr'>
          <div className='container-fluid posr menu_bdrt1 px30'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto px-0'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='logos'>
                    <Link className='header-logo logo1' href='/'>
                      <Image height={60} width={143} src='/images/HEADER-LOGO-FIA.png' alt='Header Logo' />
                    </Link>
                    <Link className='header-logo logo2' href='/'>
                      <Image height={60} width={143} src='/images/HEADER-LOGO-FIA.png' alt='Header Logo' />
                    </Link>
                  </div>
                  <Navigation isSticky={sticky} />
                </div>
              </div>
              <div className='col-auto px-0'>
                <div className='d-flex align-items-center'>
                  {user && (
                    <div className='home1_style'>
                      <Mega textColor={textColor} />
                    </div>
                  )}
                  {/* <Link className='login-info' data-bs-toggle='modal' href='#exampleModalToggle' role='button' style={{ color: textColor }}>
                    <span className='flaticon-loupe' />
                  </Link> */}
                  {user && (
                    <Link className='login-info mx10-lg mx30' href='/job-3' style={{ color: textColor }}>
                      <span className='d-none d-xl-inline-block'>בקשת פיתוח מוצר</span>
                    </Link>
                  )}
                  {!user ? (
                    <>
                      <Link className='login-info mr10-lg mr30 ms-2' href='/login' style={{ color: textColor }}>
                        התחברות
                      </Link>
                      <Link
                        className='ud-btn btn-dark add-joining'
                        href='/register'
                        style={{ backgroundColor: "#5e17eb", borderColor: "#5e17eb" }}>
                        הרשמה
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className='login-info mr10-lg mr30 ms-2'
                        href='/dashboard'
                        onClick={() => setGoingDashboard(true)}
                        aria-busy={goingDashboard}
                        style={{ color: textColor }}>
                        {goingDashboard ? (
                          <>
                            <span className='spinner-border spinner-border-sm me-1' /> עובר...
                          </>
                        ) : (
                          <>אזור אישי</>
                        )}
                      </Link>
                      <button
                        type='button'
                        className='ud-btn btn-dark add-joining'
                        onClick={handleLogout}
                        disabled={loggingOut}
                        aria-busy={loggingOut}
                        style={{ backgroundColor: "#5e17eb", borderColor: "#5e17eb" }}>
                        {loggingOut ? (
                          <>
                            <span className='spinner-border spinner-border-sm me-2' /> מתנתק...
                          </>
                        ) : (
                          <>התנתק</>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation6 />
    </>
  );
}
