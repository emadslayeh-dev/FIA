"use client";
import { testimonial } from "@/data/project";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Testimonial1() {
  const [getCurrentTestimonial, setCurrentTestimonial] = useState(
    testimonial[2]
  );

  // handler
  const testimonialHandler = (data) => {
    setCurrentTestimonial(data);
	};
	  const path = usePathname();

  return (
    <>
      <section
        className={`our-testimonial ${path === "/" ? "pt55 pb55" : "" || path === "/about-1" ? "pt55 pb55" : ""}

        `}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 mx-auto wow fadeInUp' data-wow-delay='300ms'>
              <div className='main-title text-center'>
                <h2>הלקוחות מדברים, התוצאות מספרות</h2>
                <p className='paragraph'>גלה למה יותר ויותר אנשי תעשייה בוחרים ב־FIA.</p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8 m-auto wow fadeInUp' data-wow-delay='500ms'>
              <div className='testimonial-style2'>
                {getCurrentTestimonial !== null && (
                  <>
                    <div className='testi-content text-md-center'>
                      <span className='icon fas fa-quote-left' />
                      <h4 className='testi-text'>{getCurrentTestimonial.title}</h4>
                      <h6 className='name'>{getCurrentTestimonial.name}</h6>
                      <p className='design'>{getCurrentTestimonial.company}</p>
                    </div>
                    <div className='tab-list position-relative'>
                      <ul className='nav nav-pills justify-content-md-center'>
                        {testimonial.map((item, i) => (
                          <li key={i} className='nav-item'>
                            <button
                              onClick={() => testimonialHandler(item)}
                              className={`nav-link  ${item.id === getCurrentTestimonial.id ? "active" : ""}`}>
                              <Image
                                height={70}
                                width={70}
                                src={item.image}
                                alt='user'
                                className='h-auto w-100 rounded-circle'
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
