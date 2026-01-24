"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { hightedRated1 } from "@/data/product";
import Link from "next/link";
import HeighestRetedCard2 from "../card/HighestRatedCard2";
import { categoriesByUserType } from "@/data/categoriesByUserType";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";

// Helper: find Hebrew label for a role value (case-insensitive). If userType not found or role missing in that set,
// scan all role sets as fallback. Returns label or readable transformed value.
function getRoleLabel(rawRole, userType) {
  if (!rawRole) return "תפקיד לא צוין";
  const roleLower = rawRole.toLowerCase();
  const primarySet = rolesByUserType[userType] || defaultRoles;
  const primaryFound = primarySet.find((r) => r.value.toLowerCase() === roleLower);
  if (primaryFound) return primaryFound.label;
  // Fallback scan across all sets
  for (const set of Object.values(rolesByUserType)) {
    const f = set.find((r) => r.value.toLowerCase() === roleLower);
    if (f) return f.label;
  }
  // Last resort: prettify raw value (split underscores)
  return rawRole.toLowerCase().split("_").join(" ");
}
import { useEffect, useState } from "react";

export default function HighestRated2() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState({}); // { [userId]: { count, average } }
  useEffect(() => {
    let active = true;
    fetch("/api/me") // simple ping to ensure auth; if unauthorized still show public users if desired later
      .catch(() => {})
      .finally(() => {
        fetch("/api/public-users")
          .then((r) => r.json())
          .then((d) => {
            if (!active) return;
            if (Array.isArray(d?.data)) setUsers(d.data);
          })
          .catch(() => {})
          .finally(() => active && setLoading(false));
      });
    return () => {
      active = false;
    };
  }, []);

  // Fetch review summaries (average + count) once users list is loaded.
  useEffect(() => {
    if (!users.length) return;
    const ids = users.map((u) => u.id).filter(Boolean);
    if (!ids.length) return;
    let cancelled = false;
    const qs = encodeURIComponent(ids.join(","));
    fetch(`/api/reviews/summary?userIds=${qs}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.ok && Array.isArray(d.data)) {
          const map = {};
          for (const row of d.data) {
            if (row?.userId != null) {
              map[row.userId] = { count: row.count, average: row.average }; // average may be null
            }
          }
          setSummaries(map);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [users]);
  return (
    <>
      <section>
        <div className='container'>
          <div className='row align-items-center wow fadeInUp'>
            <div className='col-lg-9'>
              <div className='main-title'>
                <h2 className='title'>הפרילנסרים המדורגים ביותר</h2>
                <p className='paragraph'>האנשים שמובילים בתחומם – קבלו השראה מהמומחים של FIA.</p>
              </div>
            </div>
            <div className='col-lg-3'>
              <div className='text-start text-lg-end mb-4 mb-lg-2'>
                <Link className='ud-btn2' href='/freelancer-1'>
                  גלה עוד מומחים
                  <span>
                    {" "}
                    <i className='fal fa-arrow-right-long' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className='row wow fadeInUp'>
            <div className='col-lg-12'>
              <div className='navi_pagi_bottom_center'>
                <Swiper
                  spaceBetween={30}
                  navigation={{
                    prevEl: ".btn__prev__013",
                    nextEl: ".btn__next__013",
                  }}
                  modules={[Navigation, Pagination]}
                  className='mySwiper'
                  loop={true}
                  pagination={{
                    el: ".swiper__pagination__013",
                    clickable: true,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      slidesPerGroup: 1,
                    },
                    768: {
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                    },
                    992: {
                      slidesPerView: 3,
                      slidesPerGroup: 3,
                    },
                    1200: {
                      slidesPerView: 4,
                      slidesPerGroup: 4,
                    },
                  }}>
                  {(users.length ? users : []).map((u) => {
                    const displayRole = getRoleLabel(u.role || "", u.userType);
                    const s = summaries[u.id] || { count: 0, average: 0 };
                    const ratingDisplay = s.count > 0 && typeof s.average === "number" ? s.average.toFixed(2) : "—";
                    // Categories mapping (labels)
                    let categoryLabels = [];
                    if (u.categoriesCsv) {
                      const ids = u.categoriesCsv
                        .split(",")
                        .map((x) => x.trim())
                        .filter(Boolean);
                      if (ids.length) {
                        if (u.userType) {
                          const source = categoriesByUserType[u.userType] || [];
                          const mapped = ids
                            .map((id) => {
                              const found = source.find((c) => c.value === id);
                              return found ? found.label : null;
                            })
                            .filter(Boolean);
                          categoryLabels = mapped.length ? mapped : ids; // fallback to raw ids if no labels found
                        } else {
                          categoryLabels = ids; // no userType, show raw ids
                        }
                      }
                    }
                    return (
                      <SwiperSlide key={u.id}>
                        <HeighestRetedCard2
                          data={{
                            id: u.id,
                            img: u.profileImageUrl || "/images/team/fl-1.png",
                            name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "משתמש",
                            skill: displayRole,
                            rating: ratingDisplay,
                            reviewCount: s.count,
                            location: u.country || "",
                            department: u.department || null,
                            companyNameHe: u.company?.nameHe || null,
                            companyNameEn: u.company?.nameEn || null,
                            categories: categoryLabels,
                          }}
                        />
                      </SwiperSlide>
                    );
                  })}
                  {!loading && users.length === 0 && (
                    <SwiperSlide key='empty'>
                      <div className='text-center py-5'>אין פרילנסרים להצגה עדיין</div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              <div className='row justify-content-center'>
                <div className='col-auto'>
                  <button className='swiper__btn btn__prev__013'>
                    <i className='far fa-arrow-left-long' />
                  </button>
                </div>
                <div className='col-auto'>
                  <div className='swiper__pagination swiper__pagination__013'></div>
                </div>
                <div className='col-auto'>
                  <button className='swiper__btn btn__next__013'>
                    <i className='far fa-arrow-right-long' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
