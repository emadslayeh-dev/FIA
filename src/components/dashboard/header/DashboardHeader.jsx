"use client";
import { dasboardNavigation } from "@/data/dashboard";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DashboardHeader() {
  const toggle = toggleStore((state) => state.dashboardSlidebarToggleHandler);
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const resp = await fetch("/api/me", { cache: "no-store", credentials: "include" });
        if (!resp.ok) {
          if (alive) setUser(null);
          return;
        }
        const d = await resp.json().catch(() => ({}));
        if (alive) setUser(d?.data || null);
      } catch {
        if (alive) setUser(null);
      }
    })();
    const onLogout = () => setUser(null);
    if (typeof window !== "undefined") window.addEventListener("fia-logout", onLogout);
    return () => {
      alive = false;
      if (typeof window !== "undefined") window.removeEventListener("fia-logout", onLogout);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const loadUnreadMessages = async () => {
      try {
        const resp = await fetch("/api/chat/threads", { cache: "no-store" });
        if (!resp.ok) return;
        const json = await resp.json();
        if (json.ok && alive) {
          const threads = json.data || [];
          const total = threads.reduce((sum, t) => sum + (t.unreadCount || 0), 0);
          const unreadThreads = threads.filter((t) => t.unreadCount > 0).slice(0, 3);
          setUnreadCount(total);
          setUnreadMessages(unreadThreads);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadUnreadMessages();
    const interval = setInterval(loadUnreadMessages, 15000);
    return () => {
      alive = false;
      clearInterval(interval);
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
      if (!resp.ok) console.warn("Logout header response not ok", resp.status);
    } catch (e) {
      console.warn("Logout header fetch failed", e);
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
      <header className='header-nav nav-innerpage-style menu-home4 dashboard_header main-menu'>
        <nav className='posr'>
          <div className='container-fluid pr30 pr15-xs pl30 posr menu_bdrt1'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-6 col-lg-auto'>
                <div className='text-center text-lg-start d-flex align-items-center'>
                  <div className='dashboard_header_logo position-relative me-2 me-xl-5'>
                    <Link href='/' className='logo'>
                      <Image height={60} width={143} src='/images/HEADER-LOGO-FIA.png' alt='logo' />
                    </Link>
                  </div>
                  <div className='fz20 ml90'>
                    <a onClick={toggle} className='dashboard_sidebar_toggle_icon vam'>
                      <Image height={18} width={20} src='/images/dashboard-navicon.svg' alt='navicon' />
                    </a>
                  </div>
                  <a
                    className='login-info d-block d-xl-none ml40 vam'
                    data-bs-toggle='modal'
                    href='#exampleModalToggle'>
                    <span className='flaticon-loupe' />
                  </a>
                  <div className='ml40 d-none d-xl-block'>
                    <div className='search_area dashboard-style ml40'>
                      <input type='text' className='form-control border-0 pr40' placeholder='מה מעניין אותך היום ?' />
                      <label>
                        <span className='flaticon-loupe' />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-lg-auto'>
                <div className='text-center text-lg-end header_right_widgets'>
                  <ul className='dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0'>
                    <li className='d-none d-sm-block'>
                      <a
                        className='text-center mr5 text-thm2 dropdown-toggle fz20'
                        type='button'
                        data-bs-toggle='dropdown'>
                        <span className='flaticon-notification' />
                      </a>
                      <div className='dropdown-menu'>
                        <div className='dboard_notific_dd px30 pt10 pb15'>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-1.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>Your resume</p>
                              <p className='text mb-0'>updated!</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-2.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>You changed</p>
                              <p className='text mb-0'>password</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-3.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>Your account has been</p>
                              <p className='text mb-0'>created successfully</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-4.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>You applied for a job </p>
                              <p className='text mb-0'>Front-end Developer</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center'>
                            <Image height={40} width={40} src='/images/resource/notif-5.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>Your course uploaded</p>
                              <p className='text mb-0'>successfully</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='d-none d-sm-block'>
                      <a
                        className='text-center mr5 text-thm2 dropdown-toggle fz20'
                        type='button'
                        data-bs-toggle='dropdown'
                        style={{ position: "relative" }}>
                        <span className='flaticon-mail' />
                        {unreadCount > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-5px",
                              right: "-8px",
                              background: "#dc3545",
                              color: "#fff",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px",
                              fontWeight: "bold",
                              boxShadow: "0 2px 6px rgba(220, 53, 69, 0.4)",
                            }}>
                            {unreadCount}
                          </span>
                        )}
                      </a>
                      <div className='dropdown-menu'>
                        <div className='dboard_notific_dd px30 pt20 pb15'>
                          {unreadMessages.length === 0 ? (
                            <div className='text-center py-3'>
                              <p className='text mb-0'>אין הודעות חדשות</p>
                            </div>
                          ) : (
                            unreadMessages.map((thread, idx) => {
                              const partner = thread.partner;
                              const lastMsg = thread.lastMessage;
                              return (
                                <div key={idx}>
                                  <Link
                                    href={`/message?with=${thread.partnerId}`}
                                    className='notif_list d-flex align-items-start'
                                    style={{
                                      cursor: "pointer",
                                      textDecoration: "none",
                                      transition: "background 0.2s ease",
                                      padding: "8px",
                                      borderRadius: "8px",
                                      direction: "rtl",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                                    <Image
                                      height={50}
                                      width={50}
                                      className='rounded-circle'
                                      style={{ objectFit: "cover", flexShrink: 0, marginLeft: "12px" }}
                                      src={partner?.profileImageUrl || "/images/testimonials/testi-1.png"}
                                      alt={partner?.firstName || "user"}
                                    />
                                    <div className='details' style={{ minWidth: 0, flex: 1, textAlign: "right" }}>
                                      <div className='d-flex justify-content-between align-items-center mb-2'>
                                        <p
                                          className='dark-color mb-0'
                                          style={{ fontSize: "16px", fontWeight: 600, color: "#1a202c" }}>
                                          {partner ? `${partner.firstName} ${partner.lastName}` : "משתמש"}
                                        </p>
                                        <p
                                          className='mb-0'
                                          style={{
                                            fontSize: "12px",
                                            color: "#667eea",
                                            fontWeight: 500,
                                            whiteSpace: "nowrap",
                                            marginRight: "12px",
                                          }}>
                                          {lastMsg
                                            ? new Date(lastMsg.createdAt).toLocaleString("he-IL", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                day: "numeric",
                                                month: "short",
                                              })
                                            : ""}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          background: "#f7fafc",
                                          padding: "8px 12px",
                                          borderRadius: "8px",
                                          marginTop: "8px",
                                        }}>
                                        <p
                                          style={{
                                            margin: 0,
                                            overflow: "show",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            fontSize: "14px",
                                            color: "#1a202c",
                                            fontWeight: 500,
                                            lineHeight: "1.6",
                                          }}>
                                          {lastMsg?.body || "הודעה חדשה"}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                  {idx < unreadMessages.length - 1 && (
                                    <div
                                      style={{
                                        height: "1px",
                                        background:
                                          "linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)",
                                        margin: "16px 0",
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })
                          )}
                          <div className='d-grid'>
                            <Link href='/message' className='ud-btn btn-thm w-100'>
                              צפה בכל ההודעות
                              <i className='fal fa-arrow-left-long' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='d-none d-sm-block'>
                      <a
                        className='text-center mr5 text-thm2 dropdown-toggle fz20'
                        type='button'
                        data-bs-toggle='dropdown'>
                        <span className='flaticon-like' />
                      </a>
                      <div className='dropdown-menu'>
                        <div className='dboard_notific_dd px30 pt10 pb15'>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-1.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>Your resume</p>
                              <p className='text mb-0'>updated!</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-2.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>You changed</p>
                              <p className='text mb-0'>password</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-3.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>Your account has been</p>
                              <p className='text mb-0'>created successfully</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center bdrb1 pb15 mb10'>
                            <Image height={40} width={40} src='/images/resource/notif-4.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>You applied for a job </p>
                              <p className='text mb-0'>Front-end Developer</p>
                            </div>
                          </div>
                          <div className='notif_list d-flex align-items-center'>
                            <Image height={40} width={40} src='/images/resource/notif-5.png' alt='notif' />
                            <div className='details ml10'>
                              <p className='text mb-0'>Your course uploaded</p>
                              <p className='text mb-0'>successfully</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className='user_setting'>
                      <div className='dropdown'>
                        <a className='btn' data-bs-toggle='dropdown'>
                          <Image
                            height={50}
                            width={50}
                            src={user?.profileImageUrl || "/images/resource/user.png"}
                            alt='user avatar'
                            className='rounded-circle'
                            style={{ objectFit: "cover" }}
                          />
                        </a>
                        <div className='dropdown-menu'>
                          <div className='user_setting_content'>
                            <p className='fz15 fw400 ff-heading mb10 pl30'>Start</p>
                            {dasboardNavigation.slice(0, 8).map((item, i) => (
                              <Link
                                key={i}
                                className={`dropdown-item ${path === item.path ? "active" : ""}`}
                                href={item.path}>
                                <i className={`${item.icon} mr10`} />
                                {item.name}
                              </Link>
                            ))}
                            <p className='fz15 fw400 ff-heading mt30 pl30'>Organize and Manage</p>
                            {dasboardNavigation.slice(8, 13).map((item, i) => (
                              <Link
                                key={i}
                                className={`dropdown-item ${path === item.path ? "active" : ""}`}
                                href={item.path}>
                                <i className={`${item.icon} mr10`} />
                                {item.name}
                              </Link>
                            ))}
                            <p className='fz15 fw400 ff-heading mt30 pl30'>Account</p>
                            {dasboardNavigation.slice(13, 15).map((item, i) => {
                              const isLogout = item.name === "התנתק";
                              return isLogout ? (
                                <button
                                  type='button'
                                  key={i}
                                  className='dropdown-item text-danger'
                                  onClick={handleLogout}>
                                  <i className={`${item.icon} mr10`} /> {item.name}
                                </button>
                              ) : (
                                <Link
                                  key={i}
                                  className={`dropdown-item ${path === item.path ? "active" : ""}`}
                                  href={item.path}>
                                  <i className={`${item.icon} mr10`} />
                                  {item.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
