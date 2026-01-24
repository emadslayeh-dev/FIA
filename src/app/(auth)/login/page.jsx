"use client";
import { useEffect, useState } from "react";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [unverified, setUnverified] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  useEffect(() => {
    const v = searchParams.get("verified");
    if (v === "1") setMessage("האימייל אומת בהצלחה! אפשר להתחבר.");
    else if (v === "expired") setMessage("קישור האימות פג תוקף.");
    else if (v === "0") setMessage("קישור אימות שגוי.");

    const verifyNotice = searchParams.get("verify");
    if (verifyNotice === "1") {
      setMessage("שלחנו מייל אימות לכתובת שסיפקת. יש לאמת כדי להתחבר.");
      setUnverified(true);
    }
    const reset = searchParams.get("reset");
    if (reset === "1") setMessage("הסיסמה אופסה בהצלחה. אפשר להתחבר עם הסיסמה החדשה.");
  }, [searchParams]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage("");
    setUnverified(false);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        if (data?.error === "EMAIL_NOT_VERIFIED") {
          setMessage("יש לאמת את האימייל לפני התחברות.");
          setUnverified(true);
        } else setMessage("אימייל או סיסמה שגויים.");
        return;
      }
      router.push("/");
    } catch (e) {
      setMessage("שגיאה בהתחברות. נסו שוב.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendMsg("");
    try {
      await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setResendMsg("שלחנו מחדש מייל אימות (בדקו גם בספאם)");
    } catch (e) {
      setResendMsg("שגיאה בשליחה מחדש. נסו שוב");
    } finally {
      setResending(false);
    }
  };
  return (
    <>
      <div className='bgc-thm4'>
        <Header7 />
        <section className='our-login'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 m-auto wow fadeInUp' data-wow-delay='300ms'>
                <div className='main-title text-center'>
                  <h2 className='title'>התחברות</h2>
                  <p className='paragraph'>היכנסו כדי לנהל בקשות, לגלות ספקים ולתקשר עם פרילנסרים</p>
                </div>
              </div>
            </div>
            <div className='row wow fadeInRight' data-wow-delay='300ms'>
              <div className='col-xl-6 mx-auto'>
                <div
                  className='log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12'
                  style={{ position: "relative" }}
                  aria-busy={loading}>
                  {loading && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                      }}
                      aria-hidden='true'>
                      <span className='spinner-border' />
                    </div>
                  )}
                  <div className='mb30'>
                    <h4>שמחים לראות אתכם שוב!</h4>
                    <p className='text'>
                      אין לכם חשבון?{" "}
                      <Link href='/register' className='text-thm'>
                        הרשמו עכשיו!
                      </Link>
                    </p>
                    {message && (
                      <div className='alert alert-info mt-2 d-flex align-items-center justify-content-between gap-2'>
                        <span>{message}</span>
                        {unverified && (
                          <button
                            type='button'
                            className='btn btn-sm btn-outline-primary'
                            onClick={handleResend}
                            disabled={!email || resending}>
                            {resending ? (
                              <>
                                <span className='spinner-border spinner-border-sm me-1' /> שולח...
                              </>
                            ) : (
                              <>שלח שוב מייל אימות</>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                    {resendMsg && <div className='text-muted mb-2'>{resendMsg}</div>}
                  </div>
                  <form onSubmit={handleLogin} noValidate>
                    <div className='mb20'>
                      <label className='form-label fw600 dark-color'>אימייל</label>
                      <input
                        type='email'
                        name='email'
                        autoComplete='email'
                        required
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            /* allow form submit */
                          }
                        }}
                      />
                    </div>
                    <div className='mb15'>
                      <label className='form-label fw600 dark-color'>סיסמה</label>
                      <input
                        type='password'
                        name='password'
                        autoComplete='current-password'
                        required
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className='checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb20'>
                      <label className='custom_checkbox fz14 ff-heading'>
                        זכור אותי
                        <input type='checkbox' defaultChecked='checked' />
                        <span className='checkmark' />
                      </label>
                      <Link href='/forgot-password' className='fz14 ff-heading'>
                        שכחתם סיסמה?
                      </Link>
                    </div>
                    <div className='d-grid mb20'>
                      <button className='ud-btn btn-thm' type='submit' disabled={loading} aria-busy={loading}>
                        {loading ? (
                          <>
                            <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true' />
                            מתחבר...
                          </>
                        ) : (
                          <>
                            התחבר לחשבון <i className='fal fa-arrow-right-long' />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                  {/* <div className='hr_content mb20'>
                    <hr />
                    <span className='hr_top_text'>או</span>
                  </div>
                  <div className='d-md-flex justify-content-between'>
                    <button className='ud-btn btn-fb fz14 fw400 mb-2 mb-md-0' type='button'>
                      <i className='fab fa-facebook-f pr10' /> Continue Facebook
                    </button>
                    <button className='ud-btn btn-google fz14 fw400 mb-2 mb-md-0' type='button'>
                      <i className='fab fa-google' /> Continue Google
                    </button>
                    <button className='ud-btn btn-apple fz14 fw400' type='button'>
                      <i className='fab fa-apple' /> Continue Apple
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer4 />
      </div>
    </>
  );
}
