"use client";

import { freelancer1, product1 } from "@/data/product";
// Reviews components
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import ServiceDetailComment1 from "../element/ServiceDetailComment1";
import FreelancerFutureCard1 from "../card/FreelancerFutureCard1";
import FreelancerAbout1 from "../element/FreelancerAbout1";
import FreelancerSkill1 from "../element/FreelancerSkill1";
import Sticky from "react-stickynode";
import useScreen from "@/hook/useScreen";

import Image from "next/image";
import { useParams } from "next/navigation";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";
import { userTypes } from "@/data/sugmshtamesh";
import { countries } from "@/data/countries";
import { regions } from "@/data/regions";
import { categoriesByUserType } from "@/data/categoriesByUserType";
import { useEffect, useState, useCallback } from "react";

export default function FreelancerDetail1({ user }) {
  const { id } = useParams();
  const isMatchedScreen = useScreen(1216);

  const data = freelancer1.find((item) => item.id == id);
  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || data?.name || "Leslie Alexander"
    : data?.name || "Leslie Alexander";
  let displayRole = "UI/UX Designer";
  if (user) {
    const roleVal = user.role || "";
    const roleSet = rolesByUserType[user.userType] || defaultRoles;
    const found = roleSet.find((r) => r.value === roleVal);
    displayRole = found ? found.label : roleVal || "UI/UX Designer";
  } else if (data?.roleLabel) {
    displayRole = data.roleLabel;
  }
  let displayUserType = "";
  if (user) {
    if (user.userType === "other" && user.userTypeOther) {
      displayUserType = user.userTypeOther;
    } else {
      const ut = userTypes.find((u) => u.value === user.userType);
      displayUserType = ut ? ut.label : user.userType || "";
    }
  }
  const displayImage = user?.profileImageUrl || data?.img || "/images/team/fl-1.png";
  // Location mapping to labels (country/region/city) in Hebrew
  let displayLocation = "";
  if (user) {
    const countryEntry = countries.find((c) => c.value === user.country);
    const countryLabel = countryEntry ? countryEntry.label : user.country || "";
    const regionEntry = regions.find((r) => r.value === user.region);
    const regionLabel = regionEntry ? regionEntry.label : user.region || "";
    const cityLabel = user.city || ""; // city stored already in Hebrew per dataset
    const parts = [cityLabel, regionLabel, countryLabel].filter(Boolean);
    displayLocation = parts.join(", ");
  }
  // Member since (createdAt) in Hebrew, right aligned
  let memberSinceText = "";
  if (user?.createdAt) {
    try {
      const d = new Date(user.createdAt);
      memberSinceText = `תאריך הצטרפות: ${d.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })}`;
    } catch (e) {
      memberSinceText = "תאריך הצטרפות לא זמין";
    }
  }
  let displayCompanyHe = "";
  let displayCompanyEn = "";
  if (user?.company) {
    displayCompanyHe = user.company.nameHe || "";
    displayCompanyEn = user.company.nameEn || "";
  }
  const companyDisplayName =
    displayCompanyHe && displayCompanyEn
      ? `${displayCompanyHe} (${displayCompanyEn})`
      : displayCompanyHe || displayCompanyEn;
  const displayDescription =
    user?.description?.trim() ||
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
  // Categories display (mapped from CSV stored on user)
  let categoriesLine = "";
  if (user?.categoriesCsv) {
    const rawIds = user.categoriesCsv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const source = categoriesByUserType[user.userType] || [];
    const labels = rawIds
      .map((id) => {
        const found = source.find((c) => c.value === id);
        return found ? found.label : null;
      })
      .filter(Boolean);
    if (labels.length) {
      categoriesLine = labels.join(" • ");
    }
  }
  // Reviews now handled inside ServiceDetailReviewInfo1 & ServiceDetailComment1
  const [reviewsReloadCounter, setReviewsReloadCounter] = useState(0);
  const [reviewSummary, setReviewSummary] = useState({ count: 0, average: null });
  const [reviewSummaryLoading, setReviewSummaryLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setReviewSummaryLoading(true);
    const qs = encodeURIComponent(user.id);
    fetch(`/api/reviews/summary?userIds=${qs}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok && Array.isArray(d.data) && d.data.length) {
          const row = d.data[0];
          setReviewSummary({ count: row.count, average: row.average });
        } else {
          setReviewSummary({ count: 0, average: null });
        }
      })
      .catch(() => setReviewSummary({ count: 0, average: null }))
      .finally(() => setReviewSummaryLoading(false));
  }, [user?.id, reviewsReloadCounter]); // refresh summary when a new review is added

  return (
    <>
      <section className='pt10 pb90 pb30-md' style={{ backgroundColor: "white" }}>
        <div className='container'>
          <div className='row wow fadeInUp'>
            <div className='col-lg-8'>
              {categoriesLine && (
                <div className='mb20' dir='rtl'>
                  <span className='fw500 dark-color'>קטגוריות עיסוק:</span> <span>{categoriesLine}</span>
                </div>
              )}
              <div className='cta-service-v1 freelancer-single-v1 pt60 pb60 bdrs16 position-relative overflow-hidden mb30 d-flex align-items-center'>
                <Image
                  width={198}
                  height={226}
                  style={{ height: "fit-content" }}
                  className='left-top-img wow zoomIn'
                  src='/images/vector-img/left-top.png'
                  alt=''
                />
                <Image
                  width={255}
                  height={181}
                  style={{ height: "fit-content" }}
                  className='right-bottom-img wow zoomIn'
                  src='/images/vector-img/right-bottom.png'
                  alt=''
                />
                <div className='row wow fadeInUp'>
                  <div className='col-xl-12'>
                    <div className='position-relative pl50 pl20-sm'>
                      <div className='list-meta d-sm-flex align-items-center'>
                        <a className='position-relative freelancer-single-style' href='#'>
                          <span className='online'></span>
                          <Image
                            width={90}
                            height={90}
                            className='rounded-circle w-100 wa-sm mb15-sm'
                            src={displayImage}
                            alt='Freelancer Photo'
                          />
                        </a>
                        <div className='ml30 mr15 ml0-xs'>
                          <h5 className='title mb-1'>{displayName}</h5>
                          <p className='mb-0'>
                            קטיגורית משתמש:
                            {displayUserType && (
                              <span style={{ marginInlineStart: 8, color: "#555" }}>{displayUserType}</span>
                            )}
                          </p>
                          <p className='mb-0 dark-color fz15 fw500 list-inline-item mb5-sm' dir='rtl'>
                            ⭐
                            {reviewSummaryLoading
                              ? "טוען ביקורות..."
                              : reviewSummary.count > 0 && typeof reviewSummary.average === "number"
                                ? `${reviewSummary.average.toFixed(2)}  (${reviewSummary.count} ביקורות)`
                                : "אין ביקורות"}
                          </p>
                          {displayLocation && (
                            <p className='mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs' dir='rtl'>
                              <i className='flaticon-place vam fz20 me-2'></i> {displayLocation}
                            </p>
                          )}
                          {memberSinceText && (
                            <p
                              className='mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs text-end'
                              dir='rtl'>
                              <i className='flaticon-30-days vam fz20 me-2'></i> {memberSinceText}
                            </p>
                          )}
                          {(displayCompanyHe || displayCompanyEn) && (
                            <p className='mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs' dir='rtl'>
                              <i className='flaticon-briefcase vam fz20 me-2'></i>
                              <span className='ml2'> חברה: </span>{" "}
                              {user?.companyId ? (
                                <a href={`/company/${user.companyId}`} className='text-decoration-underline'>
                                  {companyDisplayName}
                                </a>
                              ) : (
                                companyDisplayName
                              )}
                              {" • "}תפקיד: {displayRole}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6 col-xl-3'>
                  <div className='iconbox-style1 contact-style d-flex align-items-start mb30'>
                    <div className='icon shrink-0'>
                      <span className='flaticon-target' />
                    </div>
                    <div className='details'>
                      <h5 className='title'>Job Success</h5>
                      <p className='mb-0 text'>98%</p>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6 col-xl-3'>
                  <div className='iconbox-style1 contact-style d-flex align-items-start mb30'>
                    <div className='icon shrink-0'>
                      <span className='flaticon-goal' />
                    </div>
                    <div className='details'>
                      <h5 className='title'>Total Jobs</h5>
                      <p className='mb-0 text'>921</p>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6 col-xl-3'>
                  <div className='iconbox-style1 contact-style d-flex align-items-start mb30'>
                    <div className='icon shrink-0'>
                      <span className='flaticon-fifteen' />
                    </div>
                    <div className='details'>
                      <h5 className='title'>Total Hours</h5>
                      <p className='mb-0 text'>1,499</p>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6 col-xl-3'>
                  <div className='iconbox-style1 contact-style d-flex align-items-start mb30'>
                    <div className='icon shrink-0'>
                      <span className='flaticon-file-1' />
                    </div>
                    <div className='details'>
                      <h5 className='title'>In Queue Service</h5>
                      <p className='mb-0 text'>20</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='service-about'>
                <h4 className='mb20'>תיאור</h4>
                <p className='text mb30' dir='rtl' style={{ whiteSpace: "pre-wrap" }}>
                  {displayDescription}
                </p>
                <hr className='opacity-100 mb60 mt60' />
                <h4 className='mb30'>Education</h4>
                <div className='educational-quality'>
                  <div className='m-circle text-thm'>M</div>
                  <div className='wrapper mb40'>
                    <span className='tag'>2012 - 2014</span>
                    <h5 className='mt15'>Bachlors in Fine Arts</h5>
                    <h6 className='text-thm'>Modern College</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et
                      malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                  </div>
                  <div className='m-circle before-none text-thm'>M</div>
                  <div className='wrapper mb60'>
                    <span className='tag'>2008 - 2012</span>
                    <h5 className='mt15'>Computer Science</h5>
                    <h6 className='text-thm'>Harvartd University</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et
                      malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                  </div>
                </div>
                <hr className='opacity-100 mb60' />
                <h4 className='mb30'>Work &amp; Experience</h4>
                <div className='educational-quality'>
                  <div className='m-circle text-thm'>M</div>
                  <div className='wrapper mb40'>
                    <span className='tag'>2012 - 2014</span>
                    <h5 className='mt15'>UX Designer</h5>
                    <h6 className='text-thm'>Dropbox</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et
                      malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                  </div>
                  <div className='m-circle before-none text-thm'>M</div>
                  <div className='wrapper mb60'>
                    <span className='tag'>2008 - 2012</span>
                    <h5 className='mt15'>Art Director</h5>
                    <h6 className='text-thm'>amazon</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et
                      malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                  </div>
                </div>
                <hr className='opacity-100 mb60' />
                <h4 className='mb30'>Awards adn Certificates</h4>
                <div className='educational-quality ps-0'>
                  <div className='wrapper mb40'>
                    <span className='tag'>2012 - 2014</span>
                    <h5 className='mt15'>UI UX Design</h5>
                    <h6 className='text-thm'>Udemy</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et
                      malesuada fames ac ante ipsum
                      <br className='d-none d-lg-block' />
                      primis in faucibus.
                    </p>
                  </div>
                  <div className='wrapper mb60'>
                    <span className='tag'>2008 - 2012</span>
                    <h5 className='mt15'>App Design</h5>
                    <h6 className='text-thm'>Google</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et
                      malesuada fames ac ante ipsum
                      <br className='d-none d-lg-block' />
                      primis in faucibus.
                    </p>
                  </div>
                </div>

                <hr className='opacity-100 mb60' />
                <h4 className='mb30'>Featured Services</h4>
                <div className='row mb35'>
                  {product1.slice(0, 3).map((item, i) => (
                    <div className='col-sm-6 col-xl-4' key={i}>
                      <FreelancerFutureCard1 data={item} />
                    </div>
                  ))}
                </div>
                <hr className='opacity-100 mb60' />
                <h4 className='mb30'>ביקורות</h4>
                <div className='px30 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1' dir='rtl'>
                  <ServiceDetailReviewInfo1
                    userId={user?.id}
                    reloadTrigger={reviewsReloadCounter}
                    onChanged={() => setReviewsReloadCounter((c) => c + 1)}
                  />
                  <ServiceDetailComment1 userId={user?.id} onSubmitted={() => setReviewsReloadCounter((c) => c + 1)} />
                </div>
              </div>
            </div>
            <div className='col-lg-4' id='stikyContainer'>
              {isMatchedScreen ? (
                <Sticky bottomBoundary='#stikyContainer'>
                  <div className='blog-sidebar ms-lg-auto'>
                    <FreelancerAbout1 user={user} categories={categoriesLine ? categoriesLine.split(" • ") : []} />
                    <FreelancerSkill1 categories={categoriesLine} />
                  </div>
                </Sticky>
              ) : (
                <div className='blog-sidebar ms-lg-auto'>
                  <FreelancerAbout1 user={user} categories={categoriesLine ? categoriesLine.split(" • ") : []} />
                  <FreelancerSkill1 categories={categoriesLine} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
