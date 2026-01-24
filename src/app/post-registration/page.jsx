"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import categoriesByUserType from "@/data/categoriesByUserType";
import { regions } from "@/data/regions";
import { citiesByRegion } from "@/data/cities";
import { userTypes } from "@/data/sugmshtamesh";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";
import { countries } from "@/data/countries";

export const dynamic = 'force-dynamic';

export default function PostRegistrationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tempId = searchParams.get("tempId");

  const [temp, setTemp] = useState(null);
  const [form, setForm] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [companyHasImage, setCompanyHasImage] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingBusiness, setUploadingBusiness] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!tempId) return;
    fetch(`/api/registrations?id=${encodeURIComponent(tempId)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) throw new Error(data?.error || "REG_FETCH_FAILED");
        const t = data.data;
        setTemp(t);
        const nextForm = {
          user_type: t?.userType || "",
          user_type_other: t?.userTypeOther || "",
          first_name: t?.firstName || "",
          last_name: t?.lastName || "",
          email: t?.email || "",
          company: t?.companyName || "",
          role: t?.role || "",
          country: t?.country || "",
          noBusiness: t?.noBusiness || false,
          company_selected_id: t?.companySelectedId || "",
          parent_company: "",
          region: "",
          city: "",
          postal: "",
          address: "",
          employees_range: "",
          website: "",
          categories: [],
          businessImageUrl: "",
          profileImageUrl: "",
        };
        setForm(nextForm);

        // If company was selected by id, fetch it to know if it already has image
        if (t?.companySelectedId) {
          fetch(`/api/companies/${encodeURIComponent(t.companySelectedId)}`)
            .then(async (res) => {
              const d = await res.json().catch(() => ({}));
              if (!res.ok || !d?.ok) return;
              const comp = d.data || {};
              if (comp?.imageUrl) setCompanyHasImage(true);
              // Auto-fill business fields from existing company where empty
              setForm((s) => ({
                ...s,
                parent_company: s.parent_company || comp.parentName || "",
                country: s.country || comp.country || s.country || "",
                region: s.region || comp.region || "",
                city: s.city || comp.city || "",
                postal: s.postal || comp.postal || "",
                address: s.address || comp.addressLine || "",
                employees_range: s.employees_range || comp.employeesRange || "",
                website: s.website || comp.website || "",
              }));
            })
            .catch(() => {});
        } else {
          setCompanyHasImage(false);
        }
      })
      .catch((err) => {
        console.error("Temp fetch failed", err);
      });
  }, [tempId]);

  if (!tempId) {
    return (
      <div>
        <Header7 />
        <div className='container py-5'>Missing tempId</div>
        <Footer4 />
      </div>
    );
  }

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok || !data.url) throw new Error(data?.error || "UPLOAD_FAILED");
    return data.url;
  };

  const handleChange = async (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      const file = files[0];
      if (!file) return;
      try {
        if (name === "profile_image" || name === "profileImageUrl") {
          setUploadingProfile(true);
          const url = await uploadFile(file);
          setForm((s) => ({ ...s, profileImageUrl: url }));
        } else if (name === "business_image" || name === "businessImageUrl") {
          setUploadingBusiness(true);
          const url = await uploadFile(file);
          setForm((s) => ({ ...s, businessImageUrl: url }));
        }
      } catch (err) {
        console.error("Upload failed", err);
        alert("העלאת קובץ נכשלה. נסו שוב.");
      } finally {
        setUploadingProfile(false);
        setUploadingBusiness(false);
      }
      return;
    }
    if (name === "categories") {
      // multi-select
      const options = Array.from(e.target.selectedOptions).map((o) => o.value);
      setForm((s) => ({ ...s, categories: options }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  };

  const toggleCategory = (value) => {
    setForm((s) => {
      const prev = Array.isArray(s.categories) ? s.categories : [];
      if (prev.includes(value)) {
        return { ...s, categories: prev.filter((p) => p !== value) };
      }
      return { ...s, categories: [...prev, value] };
    });
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      tempId,
      categories: Array.isArray(form.categories) ? form.categories : [],
      profileImageUrl: form.profileImageUrl || "",
      businessImageUrl: form.businessImageUrl || "",
      // business details
      parent_company: form.parent_company || null,
      country: form.country || null,
      region: form.region || null,
      city: form.city || null,
      postal: form.postal || null,
      address: form.address || null,
      employees_range: form.employees_range || null,
      website: form.website || null,
    };
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) throw new Error(data?.error || "USER_CREATE_FAILED");
        // Redirect to login with verification notice
        router.push("/login?verify=1");
      })
      .catch((err) => {
        console.error("Finalize user failed", err);
        alert("חלה שגיאה בסיום הרישום. נסו שוב.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const regionCities = (region) => citiesByRegion[region] || [];

  return (
    <>
      <Header7 />
      <section className='our-register py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8 mx-auto'>
              <div className='log-reg-form form-style1 bgc-white p30 default-box-shadow1 bdrs12'>
                <h4 className='mb-3'>השלים פרופיל כדי לסיים</h4>
                <form onSubmit={handleSubmit}>
                  <div className='row g-3 mb-3'>
                    <div className='col-md-4'>
                      <label className='form-label'>סוג משתמש</label>
                      <input
                        className='form-control'
                        readOnly
                        value={
                          form.user_type === "other" && form.user_type_other
                            ? form.user_type_other
                            : userTypes.find((u) => u.value === form.user_type)?.label || form.user_type || ""
                        }
                      />
                    </div>
                    <div className='col-md-4'>
                      <label className='form-label'>שם פרטי</label>
                      <input
                        name='first_name'
                        className='form-control'
                        value={form.first_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-md-4'>
                      <label className='form-label'>שם משפחה</label>
                      <input
                        name='last_name'
                        className='form-control'
                        value={form.last_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='row g-3 mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>דואר אלקטרוני</label>
                      <input name='email' className='form-control' value={form.email || ""} onChange={handleChange} />
                    </div>
                    {!form.noBusiness && (
                      <div className='col-md-6'>
                        <label className='form-label'>שם העסק / החברה</label>
                        <input
                          name='company'
                          readOnly
                          className='form-control'
                          value={form.company || ""}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </div>

                  <div className='row g-3 mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>תפקיד - אוטומטי</label>
                      <input
                        className='form-control'
                        readOnly
                        value={
                          (rolesByUserType[form.user_type] || defaultRoles).find((r) => r.value === form.role)?.label ||
                          form.role ||
                          ""
                        }
                      />
                    </div>
                    {!form.noBusiness && (
                      <div className='col-md-6'>
                        <label className='form-label'>שם חברת אם (אם יש)</label>
                        <input
                          name='parent_company'
                          className='form-control'
                          value={form.parent_company || ""}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </div>

                  <div className='row g-3 mb-3'>
                    <div className='col-md-4'>
                      <label className='form-label'>מדינה (אוטומטי)</label>
                      <input
                        className='form-control'
                        readOnly
                        value={countries.find((c) => c.value === form.country)?.label || form.country || ""}
                      />
                    </div>
                    <div className='col-md-4'>
                      <label className='form-label'>אזור</label>
                      <select name='region' className='form-control' value={form.region || ""} onChange={handleChange}>
                        <option value=''>בחר</option>
                        {regions.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-md-4'>
                      <label className='form-label'>עיר</label>
                      <select name='city' className='form-control' value={form.city || ""} onChange={handleChange}>
                        <option value=''>בחר</option>
                        {(regionCities(form.region) || []).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {!form.noBusiness && (
                    <div className='row g-3 mb-3'>
                      <div className='col-md-4'>
                        <label className='form-label'>מיקוד</label>
                        <input
                          name='postal'
                          className='form-control'
                          value={form.postal || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='col-md-8'>
                        <label className='form-label'>כתובת מדויקת</label>
                        <input
                          name='address'
                          className='form-control'
                          value={form.address || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  {!form.noBusiness && (
                    <div className='row g-3 mb-3'>
                      <div className='col-md-4'>
                        <label className='form-label'>כמות עובדים בחברה</label>
                        <select
                          name='employees_range'
                          className='form-control'
                          value={form.employees_range || ""}
                          onChange={handleChange}>
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
                      <div className='col-md-4'>
                        <label className='form-label'>אתר החברה (אם יש)</label>
                        <input
                          name='website'
                          className='form-control'
                          value={form.website || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='col-md-4'>
                        <label className='form-label'>קטגוריה עיסוק (בחירה מרובה)</label>
                        <div className='multi-select-dropdown' ref={dropdownRef}>
                          <button
                            type='button'
                            className='form-control multi-select-toggle'
                            onClick={() => setDropdownOpen((s) => !s)}>
                            {Array.isArray(form.categories) && form.categories.length > 0
                              ? `${form.categories.length} נבחרו`
                              : "בחר קטגוריות"}
                          </button>
                          {dropdownOpen && (
                            <div className='multi-select-menu'>
                              <div className='multi-select-scroll'>
                                {(categoriesByUserType[form.user_type] || []).map((c) => (
                                  <label key={c.value} className='multi-select-item'>
                                    <input
                                      type='checkbox'
                                      checked={
                                        Array.isArray(form.categories) ? form.categories.includes(c.value) : false
                                      }
                                      onChange={() => toggleCategory(c.value)}
                                    />
                                    <span className='multi-select-item-label'>{c.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='row g-3 mb-3'>
                    {!form.noBusiness && !companyHasImage && (
                      <div className='col-md-6'>
                        <label className='form-label'>העלאת תמונה לעסק (אם יש)</label>
                        <input
                          type='file'
                          name='business_image'
                          accept='image/*'
                          className='form-control'
                          onChange={handleChange}
                          disabled={uploadingBusiness}
                        />
                        {uploadingBusiness && (
                          <small className='text-muted d-block mt-1'>
                            <span className='spinner-border spinner-border-sm me-1' /> מעלה תמונת עסק...
                          </small>
                        )}
                        {form.businessImageUrl && !uploadingBusiness && (
                          <small className='text-success d-block mt-1'>תמונה הועלתה</small>
                        )}
                      </div>
                    )}
                    <div className='col-md-6'>
                      <label className='form-label'>העלאת תמונה פרופיל של משתמש (חייב)</label>
                      <input
                        type='file'
                        name='profile_image'
                        accept='image/*'
                        className='form-control'
                        onChange={handleChange}
                        required
                        disabled={uploadingProfile}
                      />
                      {uploadingProfile && (
                        <small className='text-muted d-block mt-1'>
                          <span className='spinner-border spinner-border-sm me-1' /> מעלה תמונת פרופיל...
                        </small>
                      )}
                      {form.profileImageUrl && !uploadingProfile && (
                        <small className='text-success d-block mt-1'>תמונה הועלתה</small>
                      )}
                    </div>
                  </div>

                  <div className='d-grid'>
                    <button
                      className='ud-btn btn-thm'
                      type='submit'
                      disabled={submitting || uploadingProfile || uploadingBusiness}
                      aria-busy={submitting || uploadingProfile || uploadingBusiness}>
                      {submitting ? (
                        <>
                          <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true' />
                          שומר...
                        </>
                      ) : (
                        <>שמור וסיים</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer4 />
    </>
  );
}
