"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header7 from "@/components/header/Header7";
import Footer4 from "@/components/footer/Footer4";

export const dynamic = "force-dynamic";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [valid, setValid] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      setValid(false);
      return;
    }
    fetch(`/api/auth/reset?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => setValid(!!d?.ok))
      .catch(() => setValid(false))
      .finally(() => setChecking(false));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password || password.length < 6) {
      setError("הסיסמה חייבת להיות באורך מינימלי של 6 תווים");
      return;
    }
    if (password !== confirm) {
      setError("הסיסמאות אינן תואמות");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError("קישור האיפוס שגוי או פג תוקף");
        return;
      }
      router.push("/login?reset=1");
    } catch (e) {
      setError("שגיאה באיפוס הסיסמה. נסו שוב.");
    } finally {
      setSaving(false);
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
                <p className='paragraph'>בחרו סיסמה חדשה לחשבון שלכם</p>
              </div>
            </div>
          </div>
          <div className='row wow fadeInRight' data-wow-delay='300ms'>
            <div className='col-xl-6 mx-auto'>
              <div className='log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12'>
                {checking ? (
                  <div className='py-2'>
                    <span className='spinner-border' />
                  </div>
                ) : !valid ? (
                  <div className='alert alert-danger'>קישור האיפוס אינו תקין או שפג תוקפו.</div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {error && <div className='alert alert-danger mb-3'>{error}</div>}
                    <div className='mb20'>
                      <label className='form-label fw600 dark-color'>סיסמה חדשה</label>
                      <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className='mb20'>
                      <label className='form-label fw600 dark-color'>אימות סיסמה</label>
                      <input
                        type='password'
                        className='form-control'
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                      />
                    </div>
                    <div className='d-grid mb20'>
                      <button className='ud-btn btn-thm' type='submit' disabled={saving} aria-busy={saving}>
                        {saving ? (
                          <>
                            <span className='spinner-border spinner-border-sm me-2' /> שומר...
                          </>
                        ) : (
                          <>אפס סיסמה</>
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='bgc-thm4'>
          <Header7 />
          <section className='our-login'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 mx-auto text-center py-5'>
                  <span className='spinner-border' role='status'>
                    <span className='visually-hidden'>טוען...</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <Footer4 />
        </div>
      }>
      <ResetPasswordContent />
    </Suspense>
  );
}
