"use client";
import EmployeeDetailSlider1 from "@/components/element/EmployeeDetailSlider1";
import AboutMe1 from "@/components/element/AboutMe1";
import Image from "next/image";
import { countries } from "@/data/countries";
import { regions } from "@/data/regions";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";
import Link from "next/link";
import CompanyReviewList from "@/components/element/CompanyReviewList";
import CompanyReviewForm from "@/components/element/CompanyReviewForm";
import { useState, useEffect } from "react";

// Reuse layout similar to EmplyeeDetail1 but adapted for company
export default function CompanyDetail1({ company }) {
  const {
    nameHe,
    nameEn,
    imageUrl,
    country,
    region,
    city,
    addressLine,
    postal,
    employeesRange,
    website,
    users = [],
    createdAt,
  } = company || {};
  const displayName = nameHe && nameEn ? `${nameHe} (${nameEn})` : nameHe || nameEn || "חברה";
  const countryLabel = country ? countries.find((c) => c.value === country)?.label || country : null;
  const regionLabel = region ? regions.find((r) => r.value === region)?.label || region : null;
  const cityLabel = city || null; // assuming stored already in display form
  const locationParts = [cityLabel, regionLabel, countryLabel].filter(Boolean);
  const location = locationParts.join(", ");
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleDateString("he-IL", { day: "2-digit", month: "long", year: "numeric" })
    : "";
  const [companyReviewsReloadCounter, setCompanyReviewsReloadCounter] = useState(0);
  const [companyReviewSummary, setCompanyReviewSummary] = useState({ count: 0, average: null, loading: false });

  useEffect(() => {
    if (!company?.id) return;
    setCompanyReviewSummary((s) => ({ ...s, loading: true }));
    fetch(`/api/company-reviews/summary?companyId=${company.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && d.data) {
          setCompanyReviewSummary({ count: d.data.count, average: d.data.average, loading: false });
        } else {
          setCompanyReviewSummary({ count: 0, average: null, loading: false });
        }
      })
      .catch(() => setCompanyReviewSummary({ count: 0, average: null, loading: false }));
  }, [company?.id, companyReviewsReloadCounter]);

  return (
    <section className='pt10 pb90 pb30-md'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-8'>
            <div className='service-about'>
              <h2 className='mb20' dir='rtl'>
                {displayName}
              </h2>
              <div className='mb25 fz15' dir='rtl'>
                {companyReviewSummary.loading
                  ? "טוען סיכום ביקורות..."
                  : companyReviewSummary.count > 0 && typeof companyReviewSummary.average === "number"
                    ? `דירוג ממוצע: ${companyReviewSummary.average.toFixed(2)} (${companyReviewSummary.count} ביקורות)`
                    : "אין ביקורות על החברה"}
              </div>
              {/* <p className='text mb10' dir='rtl'>
                {location && (
                  <span>
                    <i className='flaticon-place vam fz16 me-2'></i> {location}
                  </span>
                )}
                {dateStr && (
                  <span className='ms-3'>
                    <i className='flaticon-30-days vam fz16 me-2'></i> הוקמה: {dateStr}
                  </span>
                )}
              </p>
              {addressLine && (
                <p className='text mb10' dir='rtl'>
                  <i className='flaticon-map vam fz16 me-2'></i> כתובת: {addressLine}
                  {postal && `, ${postal}`}
                </p>
              )}
              {employeesRange && (
                <p className='text mb10' dir='rtl'>
                  <i className='flaticon-group vam fz16 me-2'></i> טווח עובדים: {employeesRange}
                </p>
              )}
              {website && (
                <p className='text mb30' dir='rtl'>
                  <i className='flaticon-internet vam fz16 me-2'></i> אתר:{" "}
                  <a href={website} target='_blank' rel='noopener noreferrer'>
                    {website}
                  </a>
                </p>
              )} */}

              <h4 className='mb20' dir='rtl'>
                אודות החברה
              </h4>
              <p className='text mb30' dir='rtl' style={{ whiteSpace: "pre-wrap" }}>
                {company?.about?.trim()
                  ? company.about
                  : "אין עדיין תיאור מפורט לחברה זו. ניתן להוסיף תיאור שיסביר את החזון, הערכים והפעילות העסקית."}
              </p>
              <hr className='opacity-100 mb40' />
              <h4 className='mb25' dir='rtl'>
                עובדים
              </h4>
              <div className='row'>
                {users.length === 0 && <div className='col-12 mb20'>אין עובדים משויכים כרגע.</div>}
                {users.map((u) => {
                  const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || "משתמש";
                  const rawRole = u.role || "";
                  let roleLabel = "";
                  if (rawRole) {
                    const set = rolesByUserType[u.userType] || defaultRoles;
                    const found = set.find((r) => r.value.toLowerCase() === rawRole.toLowerCase());
                    roleLabel = found ? found.label : rawRole.toLowerCase().split("_").join(" ");
                  }
                  return (
                    <div key={u.id} className='col-sm-6 col-xl-4 mb30'>
                      <Link
                        href={`/freelancer-single-v2/${u.id}`}
                        className='freelancer-style1 text-center bdr1 bdrs4 p20 d-block hover-box-shadow'>
                        <div className='thumb w90 mb15 mx-auto position-relative rounded-circle'>
                          <Image
                            height={90}
                            width={90}
                            className='rounded-circle mx-auto object-fit-cover'
                            src={u.profileImageUrl || "/images/team/fl-1.png"}
                            alt='employee'
                          />
                        </div>
                        <h6 className='mb5'>{fullName}</h6>
                        {roleLabel && <div className='fz14'>{roleLabel}</div>}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <hr className='opacity-100 mb60' />
              <EmployeeDetailSlider1 />

              <h4 className='mb30' dir='rtl'>
                ביקורות על החברה
              </h4>
              <div className='px30 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1' dir='rtl'>
                <CompanyReviewList
                  companyId={company?.id}
                  reloadTrigger={companyReviewsReloadCounter}
                  onChanged={() => setCompanyReviewsReloadCounter((c) => c + 1)}
                />
                <CompanyReviewForm
                  companyId={company?.id}
                  onSubmitted={() => setCompanyReviewsReloadCounter((c) => c + 1)}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='blog-sidebar ms-lg-auto'>
              <AboutMe1 company={company} users={users} />
              {/* {website && (
                <div className='bdr1 bdrs4 p20 mt30 text-center'>
                  <h5 className='title mb15'>{displayName}</h5>
                  <p className='mb0'>
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                      לאתר החברה
                    </a>
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
