"use client";
import Link from "next/link";
import { countries } from "@/data/countries";
import { regions } from "@/data/regions";

export default function AboutMe1({ company, users = [] }) {
  // Dynamic derived values (fallbacks in Hebrew)
  const industry = company?.parentName?.trim() || "לא צוין"; // using parentName as proxy for industry if provided
  const size = company?.employeesRange?.trim() || "לא צוין";
  const founded = company?.createdAt
    ? new Date(company.createdAt).toLocaleDateString("he-IL", { year: "numeric", month: "long" })
    : "לא צוין";
  // Choose first user email if company email not present (no dedicated field yet)
  const email = users.find((u) => u.email)?.email || "לא צוין";
  // No phone field in schema – placeholder
  const phone = "לא צוין";
  const countryLabel = company?.country
    ? countries.find((c) => c.value === company.country)?.label || company.country
    : null;
  const regionLabel = company?.region ? regions.find((r) => r.value === company.region)?.label || company.region : null;
  const cityLabel = company?.city || null;
  const locationParts = [cityLabel, regionLabel, countryLabel].filter(Boolean);
  const location = locationParts.length ? locationParts.join(", ") : "לא צוין";

  return (
    <div className='price-widget pt25 widget-mt-minus bdrs8' dir='rtl'>
      <h4 className='widget-title mb20'>על החברה</h4>
      <div className='category-list mt10'>
        <div className='d-flex align-items-center justify-content-between bdrb1 pb8 mb10'>
          <span className='text'>
            <i className='flaticon-menu text-thm2 pe-2 vam' /> תעשייה / חברת אם
          </span>
          <span>{industry}</span>
        </div>
        <div className='d-flex align-items-center justify-content-between bdrb1 pb8 mb10'>
          <span className='text'>
            <i className='flaticon-factory text-thm2 pe-2 vam' /> גודל חברה
          </span>
          <span>{size}</span>
        </div>
        <div className='d-flex align-items-center justify-content-between bdrb1 pb8 mb10'>
          <span className='text'>
            <i className='flaticon-calendar text-thm2 pe-2 vam' /> שנת הקמה
          </span>
          <span>{founded}</span>
        </div>
        <div className='d-flex align-items-center justify-content-between bdrb1 pb8 mb10'>
          <span className='text'>
            <i className='flaticon-call text-thm2 pe-2 vam' /> טלפון
          </span>
          <span>{phone}</span>
        </div>
        <div className='d-flex align-items-center justify-content-between bdrb1 pb8 mb10'>
          <span className='text'>
            <i className='flaticon-mail text-thm2 pe-2 vam' /> אימייל
          </span>
          <span style={{ direction: "ltr" }}>{email}</span>
        </div>
        <div className='d-flex align-items-center justify-content-between mb15'>
          <span className='text'>
            <i className='flaticon-place text-thm2 pe-2 vam' /> מיקום
          </span>
          <span>{location}</span>
        </div>
      </div>
      <div className='d-grid mt20'>
        <Link href={`/message${users[0]?.id ? `?with=${users[0].id}` : ""}`} className='ud-btn btn-thm'>
          צור קשר <i className='fal fa-arrow-right-long ms-2' />
        </Link>
      </div>
    </div>
  );
}
