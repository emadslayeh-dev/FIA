"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OurFunFact3() {
  const path = usePathname();

  return (
    <>
      <section
        className={`hover-bgc-color pb90 pb30-md overflow-hidden ml0-lg ${
          path === "/home-5" ? "ml30 cta-home5-style " : ""
        }`}>
        <Image
          height={226}
          width={198}
          className='left-top-img wow zoomIn d-none d-lg-block object-fit-contain'
          src='/images/vector-img/left-top.png'
          alt='object'
        />
        <Image
          height={181}
          width={255}
          className='right-bottom-img wow zoomIn d-none d-lg-block object-fit-contain'
          src='/images/vector-img/right-bottom.png'
          alt='object'
        />
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6 col-xl-4 wow fadeInRight' data-wow-delay='100ms'>
              <div className='cta-style6 mb30-sm'>
                <h2 className='cta-title mb25'>
                  הגשו הצעה ותתחילו לשתף פעולה <br className='d-none d-lg-block' />
                </h2>
                <p className='text-thm2 fz15 mb25'>
                  בפלטפורמת FIA תוכלו להיחשף לבקשות חדשות מהתעשייה, להציע פתרונות ולשלוח הצעות מחיר מותאמות אישית.{" "}
                  <br className='d-none d-md-block' /> כך תגדילו את סיכויי הזכייה בפרויקטים ותבנו קשרים ארוכי טווח עם
                  חברות ולקוחות.
                </p>
                <Link href='/project-2' className={`ud-btn ${path === "/" ? "btn-dark bdrs60" : "btn-thm2 ud-btn"}`}>
                  הגש הצעה עכשיו <i className='fal fa-arrow-right-long' />
                </Link>
              </div>
            </div>
            <div className='col-md-6 col-xl-6 offset-xl-2 wow fadeInLeft' data-wow-delay='300ms'>
              <div className='row align-items-center position-relative'>
                <div className='home9-floating-img position-absolute'>
                  <Image
                    height={462}
                    width={487}
                    className='w-100-lg object-fit-contain'
                    src='/images/about/element-6.png'
                    alt='object'
                  />
                </div>
                <div className='col-sm-6'>
                  <div className='funfact-style1 at-home5 bdrs16 text-center ms-md-auto'>
                    <ul className='mb-0 d-flex justify-content-center'>
                      <li>
                        <div className='timer title mb15 pl0'>4.8/5</div>
                      </li>
                    </ul>
                    <p className='fz15 dark-color'>
                      דירוג ממוצע של ספקים <br />
                      בפרויקטים שנבחרו דרך מערכת ההצעות
                    </p>
                  </div>
                  <div className='funfact-style1 at-home5 bdrs16 text-center ms-md-auto'>
                    <ul className='mb-0 d-flex justify-content-center'>
                      <li>
                        <div className='timer title mb15'>95</div>
                      </li>
                      <li>
                        <span>%</span>
                      </li>
                    </ul>
                    <p className='fz15 dark-color'>מהלקוחות חוזרים לשתף פעולה עם ספקים שהציעו הצעות מדויקות.</p>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='funfact-style1 at-home5 bdrs16 text-center'>
                    <ul className='mb-0 d-flex justify-content-center'>
                      <li>
                        <div className='title mb15 text-center'>עשרות</div>
                      </li>
                    </ul>
                    <p className='fz15 dark-color'>הזדמנויות חדשות מדי יום – אל תפספסו אותן.</p>
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
