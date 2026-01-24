"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { userTypes } from "@/data/sugmshtamesh";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";
import { countries } from "@/data/countries";
import categoriesByUserType from "@/data/categoriesByUserType";
import { departments } from "@/data/departments";

export default function ProfileDetails() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me")
      .then(async (r) => {
        if (r.status === 401) {
          router.push("/login");
          return;
        }
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d?.ok) throw new Error(d?.error || "ME_FETCH_FAILED");
        const u = d.data;
        setForm({
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          email: u.email || "",
          userType: u.userType || "",
          userTypeOther: u.userTypeOther || "",
          role: u.role || "",
          country: u.country || "",
          department: u.department || "",
          noBusiness: !!u.noBusiness,
          companyNameHe: u.company?.nameHe || "",
          companyNameEn: u.company?.nameEn || "",
          categories: u.categoriesCsv ? u.categoriesCsv.split(",") : [],
          profileImageUrl: u.profileImageUrl || "",
          description: u.description || "",
        });
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [router]);

  const updateField = (name, value) => setForm((s) => ({ ...s, [name]: value }));

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok || !data.url) throw new Error(data?.error || "UPLOAD_FAILED");
    return data.url;
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadFile(file);
      updateField("profileImageUrl", url);
    } catch (e) {
      alert("נכשלה העלאת תמונה");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        userType: form.userType,
        userTypeOther: form.userType === "other" ? form.userTypeOther || "" : null,
        role: form.role,
        country: form.country,
        department: form.department,
        noBusiness: !!form.noBusiness,
        categories: Array.isArray(form.categories) ? form.categories : [],
        profileImageUrl: form.profileImageUrl || "",
        description: form.description || "",
      };
      const r = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d?.ok) throw new Error(d?.error || "SAVE_FAILED");
      alert("נשמר בהצלחה");
    } catch (e) {
      console.error(e);
      alert("שגיאה בשמירה");
    } finally {
      setSaving(false);
    }
  };

  const roles = rolesByUserType[form.userType] || defaultRoles;

  return (
    <div className='ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative'>
      <div className='bdrb1 pb15 mb25'>
        <h5 className='list-title'>הפרטים שלי</h5>
      </div>
      {loading ? (
        <div className='py-3'>
          <span className='spinner-border' />
        </div>
      ) : (
        <div className='col-xl-12'>
          <div className='profile-box d-sm-flex align-items-center mb30'>
            <div className='profile-img mb20-sm'>
              <Image
                height={71}
                width={71}
                className='rounded-circle wa-xs'
                src={form.profileImageUrl || "/images/team/fl-1.png"}
                style={{ height: "71px", width: "71px", objectFit: "cover" }}
                alt='profile'
              />
            </div>
            <div className='profile-content ml20 ml0-xs'>
              <div className='d-flex align-items-center my-3'>
                <label>
                  <input type='file' accept='.png, .jpg, .jpeg' className='d-none' onChange={handleImageChange} />
                  <a className='upload-btn ml10'>העלה תמונה</a>
                </label>
              </div>
              {uploading && (
                <p className='text mb-0'>
                  <span className='spinner-border spinner-border-sm me-1' /> מעלה...
                </p>
              )}
            </div>
          </div>

          <form className='form-style1' onSubmit={handleSave}>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>שם פרטי</label>
                  <input
                    type='text'
                    className='form-control'
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                  />
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>שם משפחה</label>
                  <input
                    type='text'
                    className='form-control'
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>אימייל (קריאה בלבד)</label>
                  <input type='email' className='form-control' value={form.email} readOnly />
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>סוג משתמש</label>
                  <select
                    className='form-control'
                    value={form.userType}
                    onChange={(e) => updateField("userType", e.target.value)}>
                    {userTypes.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                  {form.userType === "other" && (
                    <div className='mt-2'>
                      <input
                        className='form-control'
                        placeholder='ציין סוג משתמש'
                        value={form.userTypeOther}
                        onChange={(e) => updateField("userTypeOther", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>תפקיד</label>
                  <select
                    className='form-control'
                    value={form.role}
                    onChange={(e) => updateField("role", e.target.value)}>
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>מדינה</label>
                  <select
                    className='form-control'
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value)}>
                    {countries.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>מחלקה</label>
                  <select
                    className='form-control'
                    value={form.department}
                    onChange={(e) => updateField("department", e.target.value)}>
                    {departments.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>קטגוריות עיסוק</label>
                  <select
                    multiple
                    className='form-control'
                    value={form.categories}
                    onChange={(e) => {
                      const opts = Array.from(e.target.selectedOptions).map((o) => o.value);
                      updateField("categories", opts);
                    }}>
                    {(categoriesByUserType[form.userType] || []).map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>שם העסק (עברית, קריאה בלבד)</label>
                  <input className='form-control' value={form.companyNameHe || ""} readOnly />
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>שם העסק (אנגלית, קריאה בלבד)</label>
                  <input className='form-control' value={form.companyNameEn || ""} readOnly />
                </div>
              </div>
              <div className='col-12'>
                <div className='mb20'>
                  <label className='heading-color ff-heading fw500 mb10'>תיאור</label>
                  <textarea
                    className='form-control'
                    rows={5}
                    placeholder='כתוב כאן תיאור קצר על עצמך...'
                    value={form.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                    style={{ direction: "rtl" }}
                  />
                  <small className='text-muted d-block mt5'>מקסימום מומלץ: 1000 תווים</small>
                </div>
              </div>
              <div className='col-12'>
                <div className='form-check mb-3'>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input
                      type='checkbox'
                      checked={!!form.noBusiness}
                      onChange={(e) => updateField("noBusiness", e.target.checked)}
                    />
                    <span>אין לי עסק</span>
                  </label>
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
                        <span className='spinner-border spinner-border-sm me-2' />
                        שומר...
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
