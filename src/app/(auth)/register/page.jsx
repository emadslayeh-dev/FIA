"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import Link from "next/link";
import { userTypes } from "@/data/sugmshtamesh";
import { countries } from "@/data/countries";
import { departments } from "@/data/departments";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";

export default function page() {
  const [userType, setUserType] = useState(userTypes?.[0]?.value || "");
  // freeText holds the custom text when 'other' is selected
  const [freeText, setFreeText] = useState("");
  // Companies search state (fetched from API)
  const [companyResults, setCompanyResults] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyQuery, setCompanyQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [noBusiness, setNoBusiness] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCompanyHeb, setNewCompanyHeb] = useState("");
  const [newCompanyEng, setNewCompanyEng] = useState("");
  const [saveForAll, setSaveForAll] = useState(true);
  // Country select state
  const [country, setCountry] = useState(countries?.[0]?.value || "");
  const [department, setDepartment] = useState(departments?.[0]?.value || "");
  const [role, setRole] = useState("");
  const [roleOther, setRoleOther] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // when userType changes, pick the first available role for that type (or default)
  useEffect(() => {
    const opts = rolesByUserType[userType] || defaultRoles;
    setRole(opts?.[0]?.value || "");
    setRoleOther("");
    // reset custom user-type free text when switching away from 'other'
    if (userType !== "other") setFreeText("");
  }, [userType]);

  const router = useRouter();

  // Debounced company search against DB (matches Hebrew and English names server-side)
  useEffect(() => {
    // Don't search if the company field is disabled
    if (noBusiness) return;
    // Empty query: clear results
    const q = companyQuery.trim();
    if (!q) {
      setCompanyResults([]);
      return;
    }
    setCompanyLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/companies?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((d) => setCompanyResults(Array.isArray(d?.data) ? d.data : []))
        .catch(() => setCompanyResults([]))
        .finally(() => setCompanyLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [companyQuery, noBusiness]);

  {
    companyLoading && (
      <div style={{ padding: "8px 12px", color: "#666", display: "flex", alignItems: "center", gap: 8 }}>
        <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
        <span>טוען…</span>
      </div>
    );
  }
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    const form = new FormData(e.target);
    const firstName = (form.get("first_name") || "").trim();
    const lastName = (form.get("last_name") || "").trim();
    const email = (form.get("email") || "").trim();
    const password = form.get("password") || "";
    const roleValue = role === "__other__" ? (form.get("role_other") || "").trim() : role || "";
    const userTypeOtherVal = userType === "other" ? (form.get("user_type_other") || "").trim() : null;

    // Client side validations
    const errors = [];
    if (!firstName) errors.push("יש להזין שם פרטי");
    if (!lastName) errors.push("יש להזין שם משפחה");
    if (!email) errors.push("יש להזין אימייל");
    if (password.length < 6) errors.push("סיסמה חייבת להכיל לפחות 6 תווים");
    if (!userType) errors.push("יש לבחור סוג משתמש");
    if (userType === "other" && !userTypeOtherVal) errors.push("יש להזין סוג משתמש (אחר)");
    // Must choose company OR mark no business
    const hasCompanyInfo = !!selectedCompany?.id || (!!companyQuery.trim() && !noBusiness);
    if (!hasCompanyInfo && !noBusiness) errors.push("יש לבחור עסק/חברה או לסמן שאין עסק");

    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    setSubmitting(true);
    const payload = {
      user_type: userType,
      user_type_other: userTypeOtherVal,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      company: companyQuery || "",
      company_selected_id: selectedCompany?.id || null,
      noBusiness,
      country,
      department,
      role: roleValue,
    };

    fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) throw new Error(data?.error || "REG_CREATE_FAILED");
        const tempId = data?.data?.id;
        if (!tempId) throw new Error("MISSING_TEMP_ID");
        router.push(`/pricing?tempId=${encodeURIComponent(tempId)}`);
      })
      .catch((err) => {
        console.error("Registration create failed", err);
        alert("חלה שגיאה בשמירת הרישום. נסו שוב.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div className='bgc-thm4'>
        <Header7 />
        <section className='our-register'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 m-auto wow fadeInUp' data-wow-delay='300ms'>
                <div className='main-title text-center'>
                  <h2 className='title'>הרשמה</h2>
                  <p className='paragraph'>התחילו לגלות ספקים, יצרנים ופרילנסרים – הכל בפלטפורמה אחת</p>
                </div>
              </div>
            </div>
            <div className='row wow fadeInRight' data-wow-delay='300ms'>
              <div className='col-xl-6 mx-auto'>
                <form
                  onSubmit={handleRegisterSubmit}
                  className='log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12'>
                  <div className='mb30'>
                    <h4>בואו ניצור את החשבון שלכם!</h4>
                    <p className='text mt20'>
                      כבר יש לכם חשבון?{" "}
                      <Link href='/login' className='text-thm'>
                        התחברו עכשיו!
                      </Link>
                    </p>
                  </div>

                  {/* dropdown: insert before first form label */}
                  <div className='mb25'>
                    <label className='form-label fw500 dark-color'>סוג משתמש</label>
                    <select
                      name='user_type'
                      className='form-control'
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}>
                      {userTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {userType === "other" && (
                      <div className='mt-2'>
                        <input
                          type='text'
                          name='user_type_other'
                          className='form-control'
                          placeholder='הזן סוג משתמש (אחר)'
                          value={freeText}
                          onChange={(e) => setFreeText(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <div className='row mb25 g-3'>
                    <div className='col-md-6'>
                      <label className='form-label fw500 dark-color'>שם פרטי</label>
                      <input type='text' name='first_name' className='form-control' placeholder='' required />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label fw500 dark-color'>שם משפחה</label>
                      <input type='text' name='last_name' className='form-control' placeholder='' required />
                    </div>
                  </div>
                  <div className='row mb25 g-3'>
                    <div className='col-md-6'>
                      <label className='form-label fw500 dark-color'>אימייל</label>
                      <input name='email' type='email' className='form-control' placeholder='' required />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label fw500 dark-color'>סיסמה</label>
                      <input
                        name='password'
                        type='password'
                        className='form-control'
                        placeholder=''
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div className='row mb25 g-3'>
                    <div className='col-md-6'>
                      {/* Company search / select */}
                      <div className='mb25'>
                        <label className='form-label fw500 dark-color'>שם העסק / חברה</label>

                        {!noBusiness && (
                          <div style={{ position: "relative" }}>
                            <input
                              type='text'
                              name='company'
                              className='form-control'
                              placeholder='הקלידו לחיפוש חברה או הוסיפו חדשה'
                              value={companyQuery}
                              onChange={(e) => {
                                setCompanyQuery(e.target.value);
                                setSelectedCompany(null);
                              }}
                              onFocus={() => {
                                // If empty, show recent/top companies for quick selection
                                if (!companyQuery.trim()) {
                                  setCompanyLoading(true);
                                  fetch(`/api/companies`)
                                    .then((r) => r.json())
                                    .then((d) => setCompanyResults(Array.isArray(d?.data) ? d.data : []))
                                    .catch(() => setCompanyResults([]))
                                    .finally(() => setCompanyLoading(false));
                                }
                              }}
                              autoComplete='off'
                            />

                            {/* suggestions dropdown - hide when a company is already selected */}
                            {companyQuery && !selectedCompany && (
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  right: 0,
                                  zIndex: 2000,
                                  background: "#fff",
                                  border: "1px solid #ddd",
                                  maxHeight: 220,
                                  overflowY: "auto",
                                }}>
                                {companyLoading && <div style={{ padding: "8px 12px", color: "#666" }}>טוען…</div>}
                                {!companyLoading &&
                                  companyResults.map((c) => (
                                    <div
                                      key={c.id}
                                      onClick={() => {
                                        setSelectedCompany(c);
                                        const display = c.nameEn ? `${c.nameHe} — ${c.nameEn}` : c.nameHe;
                                        setCompanyQuery(display);
                                      }}
                                      style={{ padding: "8px 12px", cursor: "pointer" }}>
                                      {c.nameHe}{" "}
                                      {c.nameEn ? <small style={{ color: "#666" }}> — {c.nameEn}</small> : null}
                                    </div>
                                  ))}
                                {!companyLoading && (companyResults?.length || 0) === 0 && (
                                  <div style={{ padding: "8px 12px", color: "#999" }}>אין תוצאות</div>
                                )}

                                {/* when no matches and no company selected, show Add button */}
                                {selectedCompany
                                  ? null
                                  : !companyLoading &&
                                    (companyResults?.length || 0) === 0 && (
                                      <div style={{ padding: "8px 12px" }}>
                                        <button
                                          type='button'
                                          className='ud-btn btn-thm'
                                          onClick={() => {
                                            const isAscii =
                                              /^[\x00-\x7F\s]+$/.test(companyQuery) && /[A-Za-z0-9]/.test(companyQuery);
                                            if (isAscii) {
                                              setNewCompanyEng(companyQuery);
                                              setNewCompanyHeb("");
                                            } else {
                                              setNewCompanyHeb(companyQuery);
                                              setNewCompanyEng("");
                                            }
                                            setModalOpen(true);
                                          }}>
                                          הוסף חברה חדשה
                                        </button>
                                      </div>
                                    )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* hidden inputs to ensure values are submitted with the form */}
                        <input type='hidden' name='company_selected_id' value={selectedCompany?.id || ""} />
                        <input type='hidden' name='noBusiness' value={noBusiness ? "1" : ""} />

                        <div className='form-check mt-2'>
                          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                            <input
                              type='checkbox'
                              checked={noBusiness}
                              onChange={(e) => setNoBusiness(e.target.checked)}
                            />
                            <span>אין לי עסק</span>
                          </label>
                        </div>
                      </div>

                      {/* Add company modal */}
                      {modalOpen && (
                        <div
                          style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 3000,
                          }}>
                          <div
                            style={{ width: 520, maxWidth: "95%", background: "#fff", padding: 24, borderRadius: 8 }}>
                            <h5>הוספת חברה חדשה</h5>
                            <div className='mb-3'>
                              <label className='form-label fw500 dark-color'>שם העסק / חברה (עברית)</label>
                              <input
                                type='text'
                                className='form-control'
                                value={newCompanyHeb}
                                onChange={(e) => setNewCompanyHeb(e.target.value)}
                              />
                            </div>
                            <div className='mb-3'>
                              <label className='form-label fw500 dark-color'>שם העסק / חברה (אנגלית)</label>
                              <input
                                type='text'
                                className='form-control'
                                value={newCompanyEng}
                                onChange={(e) => setNewCompanyEng(e.target.value)}
                              />
                            </div>
                            <div className='form-check mb-3'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                id='saveForAll'
                                checked={saveForAll}
                                onChange={(e) => setSaveForAll(e.target.checked)}
                              />
                              <label className='form-check-label' htmlFor='saveForAll'>
                                שמור במערכת - המידע נכון עבור כל משתמש באותה חברה
                              </label>
                            </div>
                            <div className='d-flex justify-content-end gap-2'>
                              <button
                                type='button'
                                className='ud-btn btn-light'
                                onClick={() => {
                                  setModalOpen(false);
                                }}>
                                ביטול
                              </button>
                              <button
                                type='button'
                                className='ud-btn btn-thm'
                                onClick={() => {
                                  // add company via API
                                  let nameHeb = (newCompanyHeb || "").trim();
                                  const nameEng = (newCompanyEng || "").trim();
                                  if (!nameHeb && nameEng) nameHeb = nameEng;
                                  if (!nameHeb) return;
                                  fetch("/api/companies", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ nameHe: nameHeb, nameEn: nameEng || null }),
                                  })
                                    .then((r) => r.json())
                                    .then((d) => {
                                      if (!d?.ok || !d?.data) throw new Error("COMPANY_CREATE_FAILED");
                                      const comp = d.data;
                                      const display = comp.nameEn ? `${comp.nameHe} — ${comp.nameEn}` : comp.nameHe;
                                      setCompanyQuery(display);
                                      setSelectedCompany(comp);
                                      setModalOpen(false);
                                    })
                                    .catch((err) => {
                                      console.error(err);
                                      alert("שגיאה בשמירת חברה חדשה");
                                    });
                                }}>
                                המשך ושמור
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      {/* Country select (מדינה) */}
                      <div className='mb25'>
                        <label className='form-label fw500 dark-color'>מדינה</label>
                        <select
                          name='country'
                          className='form-control'
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}>
                          {countries.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='row mb25 g-3'>
                    <div className='col-md-6'>
                      <label className='form-label fw500 dark-color'>המחלקה שאתה עובד בה</label>
                      <select
                        name='department'
                        className='form-control'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}>
                        {departments.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label fw500 dark-color'>תפקיד</label>
                      <select
                        name='role'
                        className='form-control'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        {(rolesByUserType[userType] || defaultRoles).map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                        {/* option to enter custom role */}
                        <option value='__other__'>אחר - הזן תפקיד אחר</option>
                      </select>

                      {role === "__other__" && (
                        <div className='mt-2'>
                          <input
                            type='text'
                            name='role_other'
                            className='form-control'
                            placeholder='הזן תפקיד נוכחי'
                            value={roleOther}
                            onChange={(e) => setRoleOther(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='d-grid mb20'>
                    <button
                      className='ud-btn btn-thm default-box-shadow2'
                      type='submit'
                      disabled={submitting}
                      aria-busy={submitting}>
                      {submitting ? (
                        <>
                          <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true' />
                          שולח...
                        </>
                      ) : (
                        <>
                          צור חשבון והצטרף ל FIA <i className='fal fa-arrow-right-long' />
                        </>
                      )}
                    </button>
                  </div>
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
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer4 />
      </div>
    </>
  );
}
