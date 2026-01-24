"use client";
import React, { useEffect, useMemo, useState } from "react";
import { countries } from "@/data/countries";
import { regions } from "@/data/regions";
import { citiesByRegion } from "@/data/cities";

export default function BusinessDetails() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [form, setForm] = useState({
    nameHe: "",
    nameEn: "",
    imageUrl: "",
    parentName: "",
    country: "",
    region: "",
    city: "",
    postal: "",
    addressLine: "",
    employeesRange: "",
    website: "",
    about: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const me = await fetch("/api/me", { cache: "no-store" });
        if (me.status === 401) {
          // middleware should prevent this, but just in case
          if (typeof window !== "undefined") window.location.href = "/login";
          return;
        }
        const md = await me.json().catch(() => ({}));
        if (!md?.ok) throw new Error("ME_FETCH_FAILED");
        const cid = md.data?.companyId;
        if (!cid) {
          if (alive) setError("אין עסק משויך לחשבון זה.");
          return;
        }
        if (alive) setCompanyId(cid);

        const cr = await fetch(`/api/companies/${encodeURIComponent(cid)}`, { cache: "no-store" });
        const cd = await cr.json().catch(() => ({}));
        if (alive && cd?.ok) {
          const c = cd.data || {};
          setForm({
            nameHe: c.nameHe || "",
            nameEn: c.nameEn || "",
            imageUrl: c.imageUrl || "",
            parentName: c.parentName || "",
            country: c.country || "",
            region: c.region || "",
            city: c.city || "",
            postal: c.postal || "",
            addressLine: c.addressLine || "",
            employeesRange: c.employeesRange || "",
            website: c.website || "",
            about: c.about || "",
          });
        }
      } catch (e) {
        if (alive) setError("שגיאה בטעינת פרטי העסק");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const updateField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const regionCities = useMemo(() => (r) => citiesByRegion[r] || [], []);

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok || !data.url) throw new Error("UPLOAD_FAILED");
    return data.url;
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadFile(file);
      updateField("imageUrl", url);
    } catch (e) {
      setError("נכשלה העלאת תמונה");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!companyId) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const r = await fetch(`/api/companies/${encodeURIComponent(companyId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameHe: form.nameHe,
          nameEn: form.nameEn || null,
          imageUrl: form.imageUrl || null,
          parentName: form.parentName || null,
          country: form.country || null,
          region: form.region || null,
          city: form.city || null,
          postal: form.postal || null,
          addressLine: form.addressLine || null,
          employeesRange: form.employeesRange || null,
          website: form.website || null,
          about: form.about || null,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d?.ok) throw new Error(d?.error || "SAVE_FAILED");
      setMessage("נשמר בהצלחה");
    } catch (e) {
      setError("שגיאה בשמירת פרטי העסק");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative'>
      <div className='bdrb1 pb15 mb25'>
        <h5 className='list-title'>פרטי העסק</h5>
      </div>
      {loading ? (
        <div className='py-3'>
          <span className='spinner-border' />
        </div>
      ) : (
        <div className='col-xl-12'>
          <form className='form-style1' onSubmit={handleSave}>
            {error && <div className='alert alert-danger'>{error}</div>}
            {message && <div className='alert alert-success'>{message}</div>}
            <div className='row'>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>שם העסק (עברית)</label>
                  <input
                    className='form-control'
                    value={form.nameHe}
                    onChange={(e) => updateField("nameHe", e.target.value)}
                  />
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>שם העסק (אנגלית)</label>
                  <input
                    className='form-control'
                    value={form.nameEn}
                    onChange={(e) => updateField("nameEn", e.target.value)}
                  />
                </div>
              </div>

              <div className='col-sm-12'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>תמונת העסק</label>
                  <div className='d-flex align-items-center my-2' style={{ gap: 16 }}>
                    {form.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.imageUrl}
                        alt='company'
                        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                      />
                    ) : (
                      <div style={{ width: 100, height: 100, background: "#f2f2f2", borderRadius: 8 }} />
                    )}
                    <label>
                      <input type='file' accept='.png, .jpg, .jpeg' className='d-none' onChange={handleImageChange} />
                      <a className='upload-btn ml10'>{uploading ? "מעלה..." : "העלה תמונה"}</a>
                    </label>
                  </div>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>שם חברת אם (אם יש)</label>
                  <input
                    className='form-control'
                    value={form.parentName}
                    onChange={(e) => updateField("parentName", e.target.value)}
                  />
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>אתר החברה (אם יש)</label>
                  <input
                    className='form-control'
                    value={form.website}
                    onChange={(e) => updateField("website", e.target.value)}
                  />
                </div>
              </div>

              <div className='col-sm-12'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>אודות החברה (טקסט חופשי)</label>
                  <textarea
                    className='form-control'
                    rows={6}
                    value={form.about}
                    onChange={(e) => updateField("about", e.target.value)}
                    placeholder='כתוב כאן תיאור מפורט על החברה...'
                  />
                  <small className='text-muted'>ניתן להזין חזון, תחומי פעילות, ערכים ועוד.</small>
                </div>
              </div>

              <div className='col-sm-4'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>מדינה</label>
                  <select
                    className='form-control'
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value)}>
                    <option value=''>בחר</option>
                    {countries.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-sm-4'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>אזור</label>
                  <select
                    className='form-control'
                    value={form.region}
                    onChange={(e) => {
                      const next = e.target.value;
                      updateField("region", next);
                      if (!regionCities(next).includes(form.city)) updateField("city", "");
                    }}>
                    <option value=''>בחר</option>
                    {regions.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-sm-4'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>עיר</label>
                  <select
                    className='form-control'
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}>
                    <option value=''>בחר</option>
                    {regionCities(form.region).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='col-sm-4'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>מיקוד</label>
                  <input
                    className='form-control'
                    value={form.postal}
                    onChange={(e) => updateField("postal", e.target.value)}
                  />
                </div>
              </div>
              <div className='col-sm-8'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>כתובת מדויקת</label>
                  <input
                    className='form-control'
                    value={form.addressLine}
                    onChange={(e) => updateField("addressLine", e.target.value)}
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>כמות עובדים בחברה</label>
                  <select
                    className='form-control'
                    value={form.employeesRange}
                    onChange={(e) => updateField("employeesRange", e.target.value)}>
                    <option value=''>בחר</option>
                    <option value='1-3'>1-3</option>
                    <option value='3-10'>3-10</option>
                    <option value='10-30'>10-30</option>
                    <option value='30-50'>30-50</option>
                    <option value='50-100'>50-100</option>
                    <option value='100-200'>100-200</option>
                    <option value='200-400'>200-400</option>
                    <option value='>400'>מעל 400</option>
                  </select>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='text-start'>
                  <button
                    className='ud-btn btn-thm'
                    type='submit'
                    disabled={saving || uploading}
                    aria-busy={saving || uploading}>
                    {saving ? (
                      <>
                        <span className='spinner-border spinner-border-sm me-2' /> שומר...
                      </>
                    ) : (
                      <>שמור</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
