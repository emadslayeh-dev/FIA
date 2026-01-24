"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { countries } from "@/data/countries";
import { departments } from "@/data/departments";

export default function HeighestRetedCard2({ data, itemClass }) {
  // Dynamic categories: support array OR comma/• separated string like FreelancerSkill1.
  const categoriesRaw = data.categories;
  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw.filter(Boolean)
    : typeof categoriesRaw === "string" && categoriesRaw.trim()
      ? categoriesRaw
          .split(/[,•]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
  const maxVisible = 3;
  const visible = categories.slice(0, maxVisible);
  const remaining = categories.length - visible.length;
  const truncate = (txt, max = 24) => (txt.length > max ? txt.slice(0, max - 1) + "…" : txt);
  const path = usePathname();

  // Map country code to Hebrew label if available
  const locationLabel = (() => {
    const raw = data.location;
    if (!raw) return null;
    const found = countries.find((c) => c.value === raw);
    return found ? found.label : raw;
  })();

  // Map department value to label
  const departmentLabel = (() => {
    const raw = data.department;
    if (!raw) return null;
    const found = departments.find((d) => d.value === raw);
    return found ? found.label : raw;
  })();

  return (
    <>
      <div
        className={`${itemClass ? itemClass : "freelancer-style1 text-center bdr1 hover-box-shadow mb60"} ${
          path !== "/home-10" ? "at-home7 bdrs4" : ""
        }`}>
        <div className='thumb w90 mb25 mx-auto position-relative rounded-circle'>
          <Image
            height={90}
            width={90}
            className='rounded-circle mx-auto object-fit-cover'
            src={data.img}
            alt='avatar'
          />
          <span className='online' />
        </div>
        <div className='details'>
          <h5 className='title mb-1'>{data.name}</h5>
          <p className='mb-0'>{data.skill}</p>
          <div className='review'>
            {data.reviewCount > 0 ? (
              <p>
                <i className='fas fa-star fz10 review-color pr10' />
                <span className='dark-color'>{data.rating}</span> ({data.reviewCount} ביקורות)
              </p>
            ) : (
              <p className='mb-0'>אין עדיין ביקורות</p>
            )}
          </div>
          <div
            className='sidebar-widget mb15 pt10 pb10 bdrs8'
            dir='rtl'
            style={{ background: "transparent", boxShadow: "none", border: "none" }}>
            {/* <h4 className='widget-title fz14 text-center mb10'>קטיגוריות עיסוק</h4> */}
            <div
              className='tag-list'
              style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "6px" }}
              title={categories.join(", ")}>
              {visible.length === 0 && <span style={{ opacity: 0.7 }}>אין קטגוריות</span>}
              {visible.map((cat, i) => {
                const shown = truncate(cat);
                return (
                  <a key={i} title={cat} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {shown}
                  </a>
                );
              })}
              {remaining > 0 && <a title={`עוד ${remaining}`}>+{remaining}</a>}
            </div>
          </div>
          <hr className='opacity-100 mt20 mb15' />
          <div className='fl-meta d-flex align-items-start justify-content-between' dir='rtl'>
            <div className='meta text-end' style={{ flex: 1, minWidth: 0, textAlign: "right" }}>
              <span className='fw500 d-block mb3'>מיקום</span>
              <span
                className='fz14 fw400 d-block text-end'
                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "right" }}
                title={locationLabel || "לא צוין"}>
                {locationLabel || "לא צוין"}
              </span>
            </div>
            <div className='meta text-end' style={{ flex: 1, minWidth: 0, textAlign: "right" }}>
              <span className='fw500 d-block mb3'>מחלקה</span>
              <span
                className='fz14 fw400 d-block text-end'
                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "right" }}
                title={departmentLabel || "לא צוין"}>
                {departmentLabel || "לא צוין"}
              </span>
            </div>
            <div className='meta text-end' style={{ flex: 1, minWidth: 0, textAlign: "right" }}>
              <span className='fw500 d-block mb3'>חברה</span>
              <span
                className='fz14 fw400 d-block text-end'
                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "right" }}
                title={data.companyNameHe || data.companyNameEn || "לא צוין"}>
                {data.companyNameHe && data.companyNameEn
                  ? `${data.companyNameHe} (${data.companyNameEn})`
                  : data.companyNameHe || data.companyNameEn || "לא צוין"}
              </span>
            </div>
          </div>
          <div className='d-grid mt15'>
            <Link href={`/freelancer-single-v2/${data.id}`} className='ud-btn btn-white2 double-border bdrs4'>
              צפה בפרופיל
              <i className='fal fa-arrow-right-long' />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
