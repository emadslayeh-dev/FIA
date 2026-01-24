"use client";
import { dasboardNavigation } from "@/data/dashboard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const path = usePathname();
  const [hasCompany, setHasCompany] = useState(false);
  const [loadingProfileLink, setLoadingProfileLink] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/me", { cache: "no-store" });
        if (!r.ok) return;
        const d = await r.json().catch(() => ({}));
        if (alive && d?.ok) {
          setHasCompany(!!d.data?.companyId);
        }
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, []);

  const startItems = dasboardNavigation.slice(0, 6);
  const orgItems = dasboardNavigation.slice(6, 9);
  let accountItems = dasboardNavigation.slice(9, 13);
  if (!hasCompany) accountItems = accountItems.filter((it) => it.path !== "/business-settings");

  const handleMyProfileClick = () => {
    setLoadingProfileLink(true);
  };

  return (
    <div className='dashboard__sidebar d-none d-lg-block'>
      <div className='dashboard_sidebar_list'>
        <p className='fz15 fw400 ff-heading pl30'>התחלה</p>
        {startItems.map((item, i) => (
          <div key={i} className='sidebar_list_item mb-1'>
            <Link href={item.path} className={`items-center ${path === item.path ? "-is-active" : ""}`}>
              <span>
                <i className={`${item.icon} mr15`} />
              </span>
              <span> {item.name}</span>
            </Link>
          </div>
        ))}

        <p className='fz15 fw400 ff-heading pl30 mt30'>ארגון וניהול</p>
        {orgItems.map((item, i) => (
          <div key={i} className='sidebar_list_item mb-1'>
            <Link href={item.path} className={`items-center ${path === item.path ? "-is-active" : ""}`}>
              <i className={`${item.icon} mr15`} />
              {item.name}
            </Link>
          </div>
        ))}

        <p className='fz15 fw400 ff-heading pl30 mt30'>הגדרות חשבון</p>
        {accountItems.map((item, i) => {
          const isProfileItem = item.path === "/my-freelancer";
          if (!isProfileItem) {
            return (
              <div key={i} className='sidebar_list_item mb-1'>
                <Link href={item.path} className={`items-center ${path === item.path ? "-is-active" : ""}`}>
                  <i className={`${item.icon} mr15`} />
                  {item.name}
                </Link>
              </div>
            );
          }
          return (
            <div key={i} className='sidebar_list_item mb-1'>
              <Link
                href={item.path}
                onClick={handleMyProfileClick}
                className={`items-center ${path === item.path ? "-is-active" : ""}`}
                aria-busy={loadingProfileLink}>
                <i className={`${item.icon} mr15`} />
                {loadingProfileLink ? (
                  <>
                    <span className='spinner-border spinner-border-sm me-2' /> טוען פרופיל...
                  </>
                ) : (
                  item.name
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
