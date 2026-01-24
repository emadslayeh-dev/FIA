"use client";
import Image from "next/image";
import { countries } from "@/data/countries";
import { regions } from "@/data/regions";
import { useEffect, useState } from "react";

export default function BreadcumbCompany({ company }) {
  const displayName =
    company?.nameHe && company?.nameEn
      ? `${company.nameHe} (${company.nameEn})`
      : company?.nameHe || company?.nameEn || "חברה";
  const countryLabel = company?.country
    ? countries.find((c) => c.value === company.country)?.label || company.country
    : null;
  const regionLabel = company?.region ? regions.find((r) => r.value === company.region)?.label || company.region : null;
  const cityLabel = company?.city || null;
  const locationParts = [cityLabel, regionLabel, countryLabel].filter(Boolean);
  const location = locationParts.join(", ");
  const dateStr = company?.createdAt
    ? new Date(company.createdAt).toLocaleDateString("he-IL", { day: "2-digit", month: "long", year: "numeric" })
    : null;
  const [reviewSummary, setReviewSummary] = useState({ count: 0, average: null, loading: false });
  const [companyReviewSummary, setCompanyReviewSummary] = useState({ count: 0, average: null, loading: false });

  useEffect(() => {
    const users = company?.users || [];
    const ids = users.map((u) => u.id).filter(Boolean);
    if (!ids.length) return;
    setReviewSummary((s) => ({ ...s, loading: true }));
    const qs = encodeURIComponent(ids.join(","));
    fetch(`/api/reviews/summary?userIds=${qs}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && Array.isArray(d.data)) {
          let totalCount = 0;
          let weightedSum = 0;
          d.data.forEach((row) => {
            if (row.count && typeof row.average === "number") {
              totalCount += row.count;
              weightedSum += row.average * row.count; // use weighted sum to maintain precision
            }
          });
          const avg = totalCount > 0 ? +(weightedSum / totalCount).toFixed(2) : null;
          setReviewSummary({ count: totalCount, average: avg, loading: false });
        } else {
          setReviewSummary({ count: 0, average: null, loading: false });
        }
      })
      .catch(() => setReviewSummary({ count: 0, average: null, loading: false }));
  }, [company?.users]);

  // Company own reviews summary
  useEffect(() => {
    if (!company?.id) return;
    setCompanyReviewSummary((s) => ({ ...s, loading: true }));
    fetch(`/api/company-reviews/summary?companyId=${company.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && d?.data) {
          setCompanyReviewSummary({ count: d.data.count, average: d.data.average, loading: false });
        } else {
          setCompanyReviewSummary({ count: 0, average: null, loading: false });
        }
      })
      .catch(() => setCompanyReviewSummary({ count: 0, average: null, loading: false }));
  }, [company?.id]);
  return (
    <section className='breadcumb-section pt-0'>
      <div className='cta-employee-single freelancer-single-style mx-auto maxw1700 pt120 pt60-sm pb120 pb60-sm bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg'>
        <Image
          height={226}
          width={198}
          className='left-top-img wow zoomIn'
          src='/images/vector-img/left-top.png'
          alt='vector-img'
        />
        <Image
          height={181}
          width={255}
          className='right-bottom-img wow zoomIn'
          src='/images/vector-img/right-bottom.png'
          alt='vector-img'
        />
        <div className='container'>
          <div className='row wow fadeInUp'>
            <div className='col-xl-7'>
              <div className='position-relative'>
                <div className='list-meta d-sm-flex align-items-center'>
                  <div className='position-relative freelancer-single-style'>
                    <Image
                      height={120}
                      width={120}
                      className='rounded-circle w-100 wa-sm mb15-sm object-fit-cover'
                      src={company?.imageUrl || "/images/team/employee-single.png"}
                      alt='Company'
                    />
                    <span className='online2' />
                  </div>
                  <div className='ml20 ml0-xs' dir='rtl'>
                    <h5 className='title mb-1'>{displayName}</h5>
                    <div className='d-flex flex-wrap align-items-center gap-3 mb5-sm'>
                      {location && (
                        <p className='mb-0 dark-color fz15 fw500 list-inline-item'>
                          <i className='flaticon-place vam fz20 me-2' /> {location}
                        </p>
                      )}
                      <p className='mb-0 dark-color fz15 fw500 list-inline-item'>
                        <i className='fas fa-star vam fz10 review-color me-2'></i>
                        {companyReviewSummary.loading
                          ? "ביקורות חברה: טוען..."
                          : companyReviewSummary.count > 0 && typeof companyReviewSummary.average === "number"
                            ? `חברה: ${companyReviewSummary.average.toFixed(2)} ⭐ (${companyReviewSummary.count} ביקורות)`
                            : "לחברה אין ביקורות"}
                      </p>
                      <p className='mb-0 dark-color fz15 fw500 list-inline-item'>
                        <i className='fas fa-star vam fz10 review-color me-2'></i>
                        {reviewSummary.loading
                          ? "ביקורות עובדים: טוען..."
                          : reviewSummary.count > 0 && typeof reviewSummary.average === "number"
                            ? `עובדים: ${reviewSummary.average.toFixed(2)} ⭐ (${reviewSummary.count} ביקורות)`
                            : "לעובדים אין ביקורות"}
                      </p>
                    </div>
                    {dateStr && (
                      <p className='mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs'>
                        <i className='flaticon-30-days vam fz20 me-2' /> מאז {dateStr}
                      </p>
                    )}
                    {company?.website && (
                      <p className='text fz14 mb-2'>
                        <a href={company.website} target='_blank' rel='noopener noreferrer'>
                          לאתר החברה
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
