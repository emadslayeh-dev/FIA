import Image from "next/image";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";

export default function MessageBox({
  partner,
  messages = [],
  loading,
  onSend,
  newConversation,
  partnerProfile,
  selectedId,
  sendError,
  currentUser,
}) {
  const [text, setText] = useState("");
  const chatContainerRef = useRef(null);
  const prevLenRef = useRef(0);
  const userScrolledUpRef = useRef(false);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      userScrolledUpRef.current = distanceFromBottom > 120;
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const shouldStick = distanceFromBottom < 80 || !userScrolledUpRef.current;
    if (shouldStick) {
      el.scrollTop = el.scrollHeight;
    }
    prevLenRef.current = messages.length;
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    // Reset scroll lock so we always jump to newest after sending
    userScrolledUpRef.current = false;
    onSend?.(text);
    setText("");
    // Fallback immediate scroll (in case parent updates messages async)
    setTimeout(() => {
      const el = chatContainerRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 60);
  };

  const partnerName = partner ? `${partner.firstName} ${partner.lastName}` : "לא נבחר שותף";

  const partnerRoleLabel = (() => {
    if (!partnerProfile) return "";
    const set = rolesByUserType[partnerProfile.userType] || defaultRoles;
    const found = set.find((r) => r.value === partnerProfile.role);
    if (found) return found.label;
    // If role already seems Hebrew (contains Hebrew letters) just show it
    if (partnerProfile.role && /[\u0590-\u05FF]/.test(partnerProfile.role)) return partnerProfile.role;
    return partnerProfile.role || "";
  })();

  return (
    <section
      className='message_container mt30-md'
      dir='rtl'
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 12,
        padding: 0,
        overflow: "hidden",
      }}>
      <div
        className='user_heading px-0'
        style={{
          padding: "12px 16px 8px 16px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          margin: 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}>
        <div className='wrap d-flex align-items-center'>
          <Image
            height={56}
            width={56}
            className='rounded-circle shrink-0'
            style={{ marginLeft: "16px", flexShrink: 0 }}
            src={partner?.profileImageUrl || "/images/inbox/ms3.png"}
            alt={partner?.firstName || "placeholder"}
          />
          <div className='meta d-sm-flex justify-content-sm-between align-items-center w-100'>
            <div className='authors'>
              <h6 className='name mb-0' style={{ fontSize: "18px", fontWeight: 600, color: "#1a202c" }}>
                {partnerName}
              </h6>
              {partnerProfile && (
                <p className='preview mb-0' style={{ fontSize: "14px", color: "#718096", marginTop: "2px" }}>
                  {partnerRoleLabel || partnerProfile.userType || ""}
                </p>
              )}
              {!partnerProfile && (
                <p className='preview mb-0' style={{ fontSize: "14px", color: "#718096", marginTop: "2px" }}>
                  {partner ? "פעיל" : "בחר משתמש מצד שמאל"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className='inbox_chatting_box'
        style={{
          height: 610,
          maxHeight: 600,
          overflowY: "auto",
          padding: "20px 16px 32px 16px",
          background: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          justifyContent:
            loading || (!loading && messages.length === 0 && !newConversation)
              ? "center"
              : newConversation
                ? "flex-end"
                : "flex-start",
          alignItems: loading || (!loading && messages.length === 0 && !newConversation) ? "center" : "stretch",
        }}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <div
              className='spinner-border'
              style={{ width: "3rem", height: "3rem", color: "#667eea", marginBottom: "16px" }}
              role='status'>
              <span className='visually-hidden'>טוען...</span>
            </div>
            <div style={{ color: "#667eea", fontSize: "16px", fontWeight: 500 }}>טוען נתונים...</div>
          </div>
        )}
        {!loading && messages && messages.length === 0 && !newConversation && (
          <div style={{ textAlign: "center" }}>
            <i
              className='fal fa-comments'
              style={{ fontSize: "48px", color: "#cbd5e0", marginBottom: "12px", display: "block" }}></i>
            <div style={{ color: "#718096", fontSize: "15px" }}>אין הודעות עדיין</div>
          </div>
        )}
        {!loading && newConversation && (partner || partnerProfile || selectedId) && (
          <div
            style={{
              width: "100%",
              padding: "16px",
              background: "rgba(255,255,255,0.95)",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}>
            {partnerProfile?.description && (
              <div className='mb-3' style={{ whiteSpace: "pre-line", fontSize: "14px", color: "#2d3a45" }}>
                {partnerProfile.description}
              </div>
            )}
            {sendError && <div className='alert alert-danger py-2 px-3 mb-3'>{sendError}</div>}
            {(partner || partnerProfile) && (
              <form
                className='d-flex w-100'
                style={{ flexDirection: "row", alignItems: "center", gap: "8px" }}
                onSubmit={handleSubmit}>
                <button
                  type='submit'
                  className='btn ud-btn btn-thm'
                  style={{
                    whiteSpace: "nowrap",
                    padding: "10px 28px",
                    fontSize: "15px",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    color: "#fff",
                  }}
                  disabled={!text.trim()}>
                  התחלת שיחה
                  <i className='fal fa-paper-plane ms-1' />
                </button>
                <input
                  className='form-control'
                  dir='rtl'
                  style={{
                    flex: 1,
                    textAlign: "right",
                    paddingRight: "14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: "15px",
                    padding: "10px 14px",
                  }}
                  type='text'
                  placeholder='הקלד הודעה ראשונה'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            )}
          </div>
        )}
        {!loading && messages && messages.length > 0 && (
          <ul className='chatting_content' style={{ paddingBottom: "20px" }}>
            {[...messages]
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((m) => {
                const fromSelf = currentUser ? m.senderId === currentUser.id : m.senderId !== partner?.id;
                const bubbleStyle = {
                  background: fromSelf ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#ffffff",
                  border: fromSelf ? "none" : "1px solid #e2e8f0",
                  padding: "12px 16px",
                  borderRadius: fromSelf ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  maxWidth: "85%",
                  color: fromSelf ? "#ffffff" : "#1a202c",
                  boxShadow: fromSelf ? "0 4px 15px rgba(102, 126, 234, 0.4)" : "0 3px 12px rgba(0,0,0,0.12)",
                  whiteSpace: "pre-wrap",
                };
                return (
                  <li
                    key={m.id}
                    className={fromSelf ? "reply" : "sent"}
                    style={{
                      listStyle: "none",
                      marginBottom: 16,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: fromSelf ? "flex-start" : "flex-end",
                      width: "100%",
                    }}>
                    <div
                      className='d-flex'
                      style={{
                        gap: 8,
                        maxWidth: "85%",
                        flexDirection: fromSelf ? "row" : "row-reverse",
                        alignItems: "flex-start",
                      }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <Image
                          height={36}
                          width={36}
                          className='img-fluid rounded-circle'
                          style={{ flexShrink: 0 }}
                          src={
                            fromSelf
                              ? currentUser?.profileImageUrl || "/images/inbox/ms5.png"
                              : partner?.profileImageUrl || "/images/inbox/ms2.png"
                          }
                          alt={fromSelf ? "you" : partner?.firstName || "partner"}
                        />
                        <div className='fz13' style={{ color: "#2d3a45", fontWeight: 500, whiteSpace: "nowrap" }}>
                          {fromSelf ? "אתה" : partner?.firstName || ""}
                        </div>
                      </div>
                      <div style={bubbleStyle}>
                        <small
                          style={{
                            fontSize: 11,
                            color: fromSelf ? "rgba(255,255,255,0.9)" : "#718096",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                          }}>
                          {new Date(m.createdAt).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}
                        </small>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 12,
                          }}>
                          <div style={{ flex: 1 }}>{m.body}</div>
                          {/* <small style={{ fontSize: 11, color: "#000", fontWeight: "bold", whiteSpace: "nowrap" }}>
                            {new Date(m.createdAt).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}
                          </small> */}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>

      {!newConversation && partner && (
        <div
          className='mi_text'
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            padding: "16px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}>
          <div className='message_input'>
            {sendError && <div className='alert alert-danger py-1 px-2 mb10 fz13'>{sendError}</div>}

            <form
              className='d-flex w-100'
              style={{ flexDirection: "row", alignItems: "center", gap: "8px" }}
              onSubmit={handleSubmit}>
              <button
                type='submit'
                className='btn ud-btn btn-thm'
                style={{
                  whiteSpace: "nowrap",
                  padding: "10px 28px",
                  fontSize: "15px",
                  flexShrink: 0,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  color: "#fff",
                }}
                disabled={!text.trim()}>
                שלח
                <i className='fal fa-arrow-right-long ms-1' />
              </button>
              <input
                className='form-control'
                dir='rtl'
                style={{
                  flex: 1,
                  textAlign: "right",
                  paddingRight: "14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  color: "black",
                  fontSize: "15px",
                  padding: "10px 14px",
                }}
                type='text'
                placeholder='הקלד הודעה'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
