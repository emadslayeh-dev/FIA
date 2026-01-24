"use client";
import { useState } from "react";
import Header7 from "@/components/header/Header7";
import Footer4 from "@/components/footer/Footer4";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setDone(true);
      setMsg("אם האימייל קיים אצלנו, תקבלו קישור לאיפוס סיסמה בדקות הקרובות.");
    } catch (e) {
      setDone(true);
      setMsg("אם האימייל קיים אצלנו, תקבלו קישור לאיפוס סיסמה בדקות הקרובות.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bgc-thm4'>
      <Header7 />
      <section className='our-login'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 m-auto wow fadeInUp' data-wow-delay='300ms'>
              <div className='main-title text-center'>
                <h2 className='title'>איפוס סיסמה</h2>
                <p className='paragraph'>נשלח קישור לאיפוס סיסמה לכתובת האימייל שלכם</p>
              </div>
            </div>
          </div>
          <div className='row wow fadeInRight' data-wow-delay='300ms'>
            <div className='col-xl-6 mx-auto'>
              <div className='log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12'>
                {msg && <div className='alert alert-info'>{msg}</div>}
                {!done && (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className='mb20'>
                      <label className='form-label fw600 dark-color'>אימייל</label>
                      <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className='d-grid mb20'>
                      <button className='ud-btn btn-thm' type='submit' disabled={loading || !email} aria-busy={loading}>
                        {loading ? (
                          <>
                            <span className='spinner-border spinner-border-sm me-2' /> שולח...
                          </>
                        ) : (
                          <>שלחו לי קישור איפוס</>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer4 />
    </div>
  );
}
