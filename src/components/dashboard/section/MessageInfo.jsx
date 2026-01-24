"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import UserChatList1 from "../card/UserChatList1";
import MessageBox from "../element/MessageBox";

export default function MessageInfo() {
  // Allow configuring poll interval via env; fallback to 8000ms (8s)
  const POLL_INTERVAL_MS = parseInt(process.env.NEXT_PUBLIC_CHAT_POLL_INTERVAL || "8000", 10);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialWith = searchParams.get("with");
  const [threads, setThreads] = useState([]);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [selectedId, setSelectedId] = useState(initialWith || null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const pollRef = useRef(null); // interval reference
  const [partnerProfile, setPartnerProfile] = useState(null); // detailed profile for start view
  const [sendError, setSendError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const loadThreads = useCallback(async (silent = false) => {
    if (!silent) setLoadingThreads(true);
    try {
      const res = await fetch("/api/chat/threads", { cache: "no-store" });
      const json = await res.json();
      if (json.ok) {
        setThreads((prev) => {
          // Avoid state churn if unchanged (prevents flicker)
          const prevLastIds = prev.map((t) => t.lastMessage?.id).join("|");
          const nextLastIds = json.data.map((t) => t.lastMessage?.id).join("|");
          return prevLastIds === nextLastIds ? prev : json.data;
        });
      }
    } catch (e) {
      console.error(e);
    }
    if (!silent) setLoadingThreads(false);
  }, []);

  const loadMessages = useCallback(async (partnerId, silent = false) => {
    if (!partnerId) return;
    if (!silent) setLoadingMessages(true);
    try {
      const res = await fetch(`/api/chat/messages?with=${partnerId}`, { cache: "no-store" });
      const json = await res.json();
      if (json.ok) {
        setMessages((prev) => {
          if (
            prev.length &&
            json.data.length &&
            prev[prev.length - 1].id === json.data[json.data.length - 1].id &&
            prev.length === json.data.length
          ) {
            // No new messages; keep previous to avoid flicker
            return prev;
          }
          return json.data;
        });
      }
    } catch (e) {
      console.error(e);
    }
    if (!silent) setLoadingMessages(false);
  }, []);

  const loadPartnerProfile = useCallback(async (partnerId) => {
    if (!partnerId) return;
    try {
      const res = await fetch(`/api/users/${partnerId}`, { cache: "no-store" });
      const json = await res.json();
      if (json.ok) setPartnerProfile(json.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadThreads();
    // Fetch current user once
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const json = await res.json();
        if (json.ok) setCurrentUser(json.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [loadThreads]);

  // Soft polling without loaders to reduce visual refresh
  useEffect(() => {
    pollRef.current && clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      loadThreads(true);
      if (selectedId) {
        loadMessages(selectedId, true);
      }
    }, POLL_INTERVAL_MS);
    return () => {
      pollRef.current && clearInterval(pollRef.current);
    };
  }, [loadThreads, loadMessages, selectedId, POLL_INTERVAL_MS]);

  // Initial selection if query param present
  useEffect(() => {
    if (initialWith) setSelectedId(initialWith);
  }, [initialWith]);

  // Load messages when selection changes
  useEffect(() => {
    loadMessages(selectedId);
  }, [selectedId, loadMessages]);
  useEffect(() => {
    loadPartnerProfile(selectedId);
  }, [selectedId, loadPartnerProfile]);

  const handleSelect = (partnerId) => {
    setSelectedId(partnerId);
    // Avoid scroll reset on navigation
    try {
      router.replace(`/message?with=${partnerId}`, { scroll: false });
    } catch {
      router.replace(`/message?with=${partnerId}`);
    }
  };

  const handleSend = async (text) => {
    if (!selectedId || !text.trim()) return;
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId: selectedId, text }),
      });
      const json = await res.json();
      if (json.ok) {
        setMessages((m) => [...m, json.data]);
        loadThreads(); // refresh last message + unread counts
        setSendError("");
      } else {
        setSendError(json.error || "שגיאת שליחה בלתי ידועה");
      }
    } catch (e) {
      console.error(e);
      setSendError("שגיאה כללית בשליחה");
    }
  };

  const selectedThread = threads.find((t) => t.partnerId === selectedId) || null;
  const effectivePartner =
    selectedThread?.partner ||
    (partnerProfile
      ? {
          id: partnerProfile.id,
          firstName: partnerProfile.firstName,
          lastName: partnerProfile.lastName,
          profileImageUrl: partnerProfile.profileImageUrl,
          userType: partnerProfile.userType,
          department: partnerProfile.department,
        }
      : null);

  return (
    <div className='dashboard__content hover-bgc-color' dir='rtl'>
      <div className='row pb40'>
        <div className='col-lg-12'>
          <DashboardNavigation />
        </div>
        <div className='col-lg-12'>
          <div className='dashboard_title_area'>
            <h2>הודעות</h2>
            <p className='text'>תקשר עם משתמשים במערכת.</p>
          </div>
        </div>
      </div>
      <div className='row mb40'>
        <div className='col-lg-6 col-xl-5 col-xxl-4'>
          <div className='message_container'>
            <div className='inbox_user_list'>
              <div className='iu_heading pr35'>
                <div className='chat_user_search'>
                  <form className='d-flex align-items-center' onSubmit={(e) => e.preventDefault()}>
                    <button className='btn' type='button'>
                      <span className='far fa-magnifying-glass pl15' />
                    </button>
                    <input className='form-control pr5' type='search' placeholder='חפש משתמש' aria-label='Search' />
                  </form>
                </div>
              </div>
              <div className='chat-member-list pr20' style={{ maxHeight: 600, overflowY: "auto" }}>
                {loadingThreads && <div className='p-3'>טוען...</div>}
                {!loadingThreads && threads.length === 0 && <div className='p-3'>אין שיחות עדיין</div>}
                {threads.map((t) => (
                  <div
                    key={t.partnerId}
                    className='list-item pt5'
                    onClick={() => handleSelect(t.partnerId)}
                    style={{ cursor: "pointer" }}>
                    <UserChatList1 data={t} active={t.partnerId === selectedId} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-xl-7 col-xxl-8'>
          <MessageBox
            partner={effectivePartner}
            messages={messages}
            loading={loadingMessages}
            onSend={handleSend}
            newConversation={Boolean(selectedId) && messages.length === 0 && !loadingMessages}
            partnerProfile={partnerProfile}
            selectedId={selectedId}
            sendError={sendError}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
