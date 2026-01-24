"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { project1 } from "@/data/product";
import { Pagination, Navigation } from "swiper/modules";
import ProjectCard2 from "../card/ProjectCard2";

export default function LatestProjects1() {
  return (
    <>
      <section className='mt-10 mb0 mb0-lg pb40-md pb0'>
        <div className='container'>
          <div className='row align-items-center wow fadeInUp'>
            <div className='col-lg-9'>
              <div className='main-title'>
                <h2 className='title'>מכרזים חדשים שפתוחים להגשת הצעות</h2>
                <p className='paragraph'>בואו להגיש את ההצעה שלכם ולהתחרות על פרויקטים מובילים.</p>
              </div>
            </div>
            <div className='col-lg-3'>
              <div className='text-start text-lg-end mb-4 mb-lg-2'>
                <Link className='ud-btn2' href='/project-2'>
                  כל ההצעות
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
              <div className='navi_pagi_bottom_center mb10'>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  freeMode={true}
                  loop={true}
                  className='mySwiper'
                  navigation={{
                    prevEl: ".btn__prev__012",
                    nextEl: ".btn__next__012",
                  }}
                  pagination={{
                    el: ".swiper__pagination__012",
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination]}
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
                  {project1.slice(0, 8).map((item, i) => (
                    <SwiperSlide key={i}>
                      <div className='item'>
                        <ProjectCard2 data={item} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className='row justify-content-center'>
                  <div className='col-auto'>
                    <button className='swiper__btn btn__prev__012'>
                      <i className='far fa-arrow-left-long' />
                    </button>
                  </div>
                  <div className='col-auto'>
                    <div className='swiper__pagination swiper__pagination__012'></div>
                  </div>
                  <div className='col-auto'>
                    <button className='swiper__btn btn__next__012'>
                      <i className='far fa-arrow-right-long' />
                    </button>
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
