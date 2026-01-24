"use client";
import { dasboardNavigation } from "@/data/dashboard";
import Link from "next/link";
import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      const resp = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      // Optional: ensure server responded with ok
      if (!resp.ok) {
        console.warn("Logout response not ok", resp.status);
      }
    } catch (e) {
      console.warn("Logout fetch failed", e);
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
  }, [router]);

  return (
    <>
      <div className='dashboard_navigationbar d-block d-lg-none'>
        <div className='dropdown'>
          <button onClick={() => setActive(!isActive)} className='dropbtn'>
            <i className='fa fa-bars pr10' /> Dashboard Navigation
          </button>
          <ul className={`dropdown-content ${isActive ? "show" : ""}`}>
            <li>
              <p className='fz15 fw400 ff-heading mt30 pl30'>Start</p>
            </li>
            {dasboardNavigation.slice(0, 8).map((item, i) => (
              <li
                className={path == item.path ? "mobile-dasboard-menu-active" : ""}
                onClick={() => setActive(false)}
                key={i}>
                <Link href={item.path}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <p className='fz15 fw400 ff-heading mt30 pl30'>Organize and Manage</p>
            </li>
            {dasboardNavigation.slice(8, 13).map((item, i) => (
              <li
                className={path == item.path ? "mobile-dasboard-menu-active" : ""}
                onClick={() => setActive(false)}
                key={i}>
                <Link href={item.path}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <p className='fz15 fw400 ff-heading mt30 pl30'>Account</p>
            </li>
            {dasboardNavigation.slice(13, 15).map((item, i) => {
              const isLogout = item.name === "התנתק";
              return (
                <li className={path == item.path ? "mobile-dasboard-menu-active" : ""} key={i}>
                  {isLogout ? (
                    <button
                      type='button'
                      onClick={() => {
                        setActive(false);
                        handleLogout();
                      }}
                      className='dropdown-item w-100 text-start'
                      style={{ background: "none", border: "none" }}>
                      <i className={`${item.icon} mr10`} /> {item.name}
                    </button>
                  ) : (
                    <Link href={item.path} onClick={() => setActive(false)}>
                      <i className={`${item.icon} mr10`} />
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
