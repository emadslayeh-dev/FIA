"use client";
import { blog1 } from "@/data/blog";
import BlogCard1 from "../card/BlogCard1";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function OurBlog1() {
  const path = usePathname();

  return (
    <>
      <section className={`pb90 pb20-md ${path === "/home-4" || path === "/" ? "pt0" : ""}`}>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-lg-6 wow fadeInUp' data-wow-delay='00ms'>
              <div className='main-title'>
                <h2 className='title'>עדכונים חמים</h2>
                <p className='paragraph'>הישארו בחזית החדשנות – כל מה שחם בעולם הפוד-טק והתעשייה.</p>
              </div>
            </div>
          </div>
          <div className='row wow fadeInUp' data-wow-delay='300ms'>
            {blog1.slice(0, 4).map((item, i) => (
              <div key={i} className='col-sm-6 col-xl-3'>
                <BlogCard1 data={item} isContentExpanded={path === "/home-6" ? true : false} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
