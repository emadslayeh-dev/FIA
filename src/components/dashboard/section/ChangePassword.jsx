"use client";
import { useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!newPassword || newPassword.length < 6) {
      setError("הסיסמה החדשה חייבת להיות באורך של לפחות 6 תווים");
      return;
    }
    if (newPassword !== confirm) {
      setError("הסיסמאות אינן תואמות");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        const code = data?.error || "CHANGE_FAILED";
        if (code === "WRONG_OLD_PASSWORD") setError("הסיסמה הנוכחית שגויה");
        else if (code === "PASSWORD_TOO_SHORT") setError("הסיסמה החדשה קצרה מדי");
        else if (res.status === 401) setError("יש להתחבר מחדש");
        else setError("אירעה שגיאה בשינוי הסיסמה");
        return;
      }
      setMessage("הסיסמה עודכנה בהצלחה");
      setOldPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (e) {
      setError("אירעה שגיאה בשינוי הסיסמה");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative'>
      <div className='bdrb1 pb15 mb25'>
        <h5 className='list-title'>איפוס/שינוי סיסמה</h5>
      </div>
      <div className='col-lg-7'>
        <div className='row'>
          <form className='form-style1' onSubmit={onSubmit}>
            {message && <div className='alert alert-success'>{message}</div>}
            {error && <div className='alert alert-danger'>{error}</div>}
            <div className='row'>
              <div className='col-sm-12'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>סיסמה נוכחית</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='הקלידו סיסמה נוכחית'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    autoComplete='current-password'
                  />
                  <small className='text-muted'>במידה ולא הוגדרה סיסמה קודם, ניתן להשאיר ריק</small>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>סיסמה חדשה</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='הקלידו סיסמה חדשה'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete='new-password'
                  />
                </div>
              </div>
              <div className='col-sm-12'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>אימות סיסמה חדשה</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='אמתו את הסיסמה החדשה'
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete='new-password'
                  />
                </div>
              </div>
              <div className='col-md-12'>
                <div className='text-start'>
                  <button className='ud-btn btn-thm' type='submit' disabled={saving} aria-busy={saving}>
                    {saving ? (
                      <>
                        <span className='spinner-border spinner-border-sm me-2' /> שומר...
                      </>
                    ) : (
                      <>
                        עדכן סיסמה <i className='fal fa-arrow-right-long' />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
