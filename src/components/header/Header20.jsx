"use client";
import Link from "next/link";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Mega from "./Mega";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";
import { useEffect, useState, useCallback } from "react";

export default function Header20() {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

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
  }, [path]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
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
      <header className='header-nav nav-innerpage-style main-menu  '>
        <nav className='posr'>
          <div className='container-fluid posr menu_bdrt1'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto pe-0'>
                <div className='d-flex align-items-center'>
                  <Link className='header-logo bdrr1 pr30 pr5-xl' href='/'>
                    <Image
                      height={40}
                      width={133}
                      className='w-100 h-100 object-fit-contain'
                      src='/images/header-logo-dark.svg'
                      alt='Header Logo'
                    />
                  </Link>
                  <div className='home1_style'>
                    <Mega />
                  </div>
                </div>
              </div>
              <div className='col-auto'>
                <div className='d-flex align-items-center'>
                  <Navigation />
                  <a className='login-info bdrl1 pl15-lg pl30' data-bs-toggle='modal' href='#exampleModalToggle'>
                    <span className='flaticon-loupe' />
                  </a>
                  {!user ? (
                    <>
                      <Link className={`login-info mr15-lg mr30 ${path === "/login" ? "ui-active" : ""}`} href='/login'>
                        התחברו
                      </Link>
                      <Link className='ud-btn btn-thm add-joining' href='/register'>
                        הרשמה
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className={`login-info mr15-lg mr30 ${path === "/dashboard" ? "ui-active" : ""}`}
                        href='/dashboard'>
                        אזור אישי
                      </Link>
                      <button type='button' className='ud-btn btn-thm add-joining' onClick={handleLogout}>
                        התנתק
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation2 />
    </>
  );
}
