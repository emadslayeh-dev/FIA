import Image from "next/image";

export default function UserChatList1({ data, active }) {
  const partner = data.partner;
  const last = data.lastMessage;
  const unread = data.unreadCount;
  const fullName = partner ? `${partner.firstName} ${partner.lastName}` : "משתמש";
  return (
    <div
      className={`d-flex align-items-center position-relative py-2 px-2 bdrs8`}
      style={{
        background: active ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
        transition: "all 0.3s ease",
      }}
      dir='rtl'>
      <Image
        height={56}
        width={56}
        className='rounded-circle shrink-0'
        style={{ marginLeft: "12px" }}
        src={partner?.profileImageUrl || "/images/inbox/ms2.png"}
        alt={partner?.firstName || "user"}
      />
      <div className='grow d-flex flex-column justify-content-center' style={{ minWidth: 0 }}>
        <div
          className='ff-heading mb-1'
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: active ? "#fff" : "#1a202c",
            fontSize: "16px",
            fontWeight: 600,
          }}>
          {fullName}
        </div>
        <div
          className='d-flex align-items-center gap-2'
          style={{ direction: "rtl", minWidth: 0, whiteSpace: "nowrap" }}>
          <span
            className='grow'
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: active ? "rgba(255,255,255,0.95)" : "#718096",
              fontSize: "14px",
              fontWeight: 500,
            }}>
            {last?.body || "אין הודעות"}
          </span>
          {unread > 0 && <span className='m_notif notify shrink-0'>{unread}</span>}
          <small
            className='shrink-0'
            style={{ color: active ? "rgba(255,255,255,0.9)" : "#a0aec0", fontSize: "12px", fontWeight: 500 }}>
            {last ? new Date(last.createdAt).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }) : ""}
          </small>
        </div>
      </div>
    </div>
  );
}
