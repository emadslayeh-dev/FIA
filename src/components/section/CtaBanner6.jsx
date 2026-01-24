"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CtaBanner6() {
  const path = usePathname();
  return (
    <>
      <section className='cta-banner-home7 position-relative pt15 pb30'>
        <div className='container'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-md-7 col-xl-5 wow fadeInRight'>
              <div className='testimonial-style4 position-relative ps-0'>
                <h2 className='sub-title text-thm mb20'>המותג שלך. המוצרים שלנו.</h2>
                <h4 className='title mb45 mb30-md'>
                  “ הקם קו מוצרים ייחודי תחת המותג שלך בעזרת ספקים מובילים מהתעשייה. בחר, עצב, ומכור – אנחנו נדאג לשאר.
                  ”
                </h4>
                <Link href='/job-3' className={`ud-btn ${path === "/" ? "btn-dark bdrs60" : "btn-thm2 ud-btn"}`}>
                  התחל פיתוח מותג פרטי <i className='fal fa-arrow-right-long' />
                </Link>
              </div>
            </div>
            <div className='col-md-5 col-xl-5 wow fadeInLeft'>
              <Image
                height={576}
                width={572}
                className='w-100 h-auto bdrs4 object-fit-contain'
                src='/images/about/private label food product label.jpg'
                alt='about'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
