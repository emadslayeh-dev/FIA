"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";
import HeroSearch1 from "../element/HeroSearch1";
import { useRouter } from "next/navigation";
import { userTypes } from "@/data/sugmshtamesh";

const popular = ["מעצב", "מפתח", "אתרים", "IOS", "PHP", "בכיר", "מהנדס"];

const hero = ["/images/home/Home1.png", "/images/home/home-2.jpg"];

export default function Hero1() {
  const [getSelectedRole, setSelectedRole] = useState(null);

  // role handler
  const roleHandler = (select) => {
    setSelectedRole(select);
  };

  const router = useRouter();
  // search handler
  const searchHandler = () => {
    router.push("/freelancer-1");
  };

  return (
    <>
      <section className='home-one p-0 space-maintain-1'>
        <div className='container-fluid px-0'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='main-banner-wrapper home1_style'>
                <div className='ui-hero-slide'>
                  <Swiper
                    className='mySwiper'
                    loop={true}
                    effect={"fade"}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[EffectFade, Navigation]}
                    navigation={{
                      nextEl: ".right-btn",
                      prevEl: ".left-btn",
                    }}>
                    {hero.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Image height={4000} width={4000} src={item} className='ui-hero-slide__img' alt='Hero Banner' />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className='carousel-btn-block banner-carousel-btn'>
                    <span className='carousel-btn left-btn'>
                      <i className='fas fa-chevron-left left' />
                    </span>
                    <span className='carousel-btn right-btn'>
                      <i className='fas fa-chevron-right right' />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='home1-banner-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-10 col-xxl-7'>
                <div className='position-relative'>
                  <h3 className='banner-title animate-up-2'>
                    מצא את המקצוענים הטובים ביותר <br className='d-none d-lg-block' />
                    לכל עבודה, באינטרנט.
                  </h3>
                  <p className='banner-text text-white ff-heading mb25 animate-up-3'>
                    מיליוני אנשים משתמשים ב-FIA כדי להפוך את הרעיונות שלהם למציאות.
                  </p>
                  <div className='advance-search-tab bgc-white bgct-sm p10 p0-md bdrs4 banner-btn position-relative zi9 animate-up-4'>
                    <div className='row'>
                      <div className='col-md-5 col-lg-6 col-xl-6'>
                        <div className='advance-search-field mb10-sm bdrr1 bdrn-sm'>
                          <HeroSearch1 />
                        </div>
                      </div>
                      <div className='col-md-4 col-lg-4 col-xl-4 d-none d-md-block'>
                        <div className='bselect-style1'>
                          <div className='dropdown bootstrap-select'>
                            <button type='button' className='btn dropdown-toggle btn-light' data-bs-toggle='dropdown'>
                              <div className='filter-option'>
                                <div className='filter-option-inner'>
                                  <div className='filter-option-inner-inner'>
                                    {getSelectedRole !== null ? getSelectedRole : "בחר קטגוריה"}
                                  </div>
                                </div>
                              </div>
                            </button>
                            <div
                              className='dropdown-menu'
                              style={{
                                maxHeight: "400px",
                                overflowY: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              }}>
                              <div className='inner show'>
                                <ul className='dropdown-menu inner show' style={{ maxHeight: "none" }}>
                                  <li
                                    className='px-3 py-2'
                                    style={{
                                      background: "#f8f9fa",
                                      fontWeight: 600,
                                      color: "#667eea",
                                      borderBottom: "2px solid #667eea",
                                    }}>
                                    <span>בחר קטגוריה</span>
                                  </li>
                                  {userTypes.map((item, index) => (
                                    <li
                                      onClick={() => roleHandler(item.label)}
                                      key={index}
                                      className='selected active'
                                      style={{
                                        borderBottom: index < userTypes.length - 1 ? "1px solid #e9ecef" : "none",
                                        transition: "background 0.2s ease",
                                      }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                          getSelectedRole === item.label ? "#e7f3ff" : "transparent")
                                      }>
                                      <a
                                        className={`dropdown-item selected ${
                                          getSelectedRole === item.label ? "active" : ""
                                        }`}
                                        style={{
                                          padding: "12px 16px",
                                          fontSize: "14px",
                                          background: getSelectedRole === item.label ? "#e7f3ff" : "transparent",
                                          color: getSelectedRole === item.label ? "#667eea" : "#1a202c",
                                          fontWeight: getSelectedRole === item.label ? 600 : 400,
                                        }}>
                                        <span className='text'>{item.label}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-3 col-lg-2 col-xl-2 ps-md-0'>
                        <div className='text-center text-xl-end'>
                          <button onClick={searchHandler} className='ud-btn btn-thm w-150 px-4' type='button'>
                            חיפוש
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-none d-md-flex mt30 banner-text animate-up-5'>
                    <p className='hero-text fz15 me-2 text-white mb-0'>חיפושים פופולריים</p>
                    {popular.map((elm, i) => (
                      <a key={i} className='text-white' style={{ marginRight: "5px" }}>
                        {`${elm}${i != popular.length - 1 ? "," : " "}`}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
