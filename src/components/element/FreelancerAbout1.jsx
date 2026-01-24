import Link from "next/link";
import { countries } from "@/data/countries";
import { regions } from "@/data/regions";
import { rolesByUserType, defaultRoles } from "@/data/rolesByUserType";
import { departments } from "@/data/departments";
import { categoriesByUserType } from "@/data/categoriesByUserType";
import { userTypes } from "@/data/sugmshtamesh";

// Helper to format date in Hebrew (e.g., "נובמבר 2025")
function formatHebrewMonth(date) {
  try {
    return date.toLocaleDateString("he-IL", { year: "numeric", month: "long" });
  } catch (e) {
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
}

export default function FreelancerAbout1({ user, categories }) {
  const createdAt = user?.createdAt ? new Date(user.createdAt) : null;
  const memberSince = createdAt ? formatHebrewMonth(createdAt) : "לא צוין";
  // Map location values to Hebrew labels
  const countryLabel = user?.country ? countries.find((c) => c.value === user.country)?.label || user.country : null;
  const regionLabel = user?.region ? regions.find((r) => r.value === user.region)?.label || user.region : null;
  const cityLabel = user?.city || null; // assuming already Hebrew / free text
  const locationParts = [cityLabel, regionLabel, countryLabel].filter(Boolean);
  const location = locationParts.length ? locationParts.join(", ") : "לא צוין";

  // Map role value to label using userType-specific list or default
  let role = "לא צוין";
  if (user?.role) {
    const list = user?.userType && rolesByUserType[user.userType] ? rolesByUserType[user.userType] : defaultRoles;
    const found = list.find((r) => r.value === user.role);
    role = found ? found.label : user.role;
  }

  // Map department value to label
  let department = "לא צוין";
  if (user?.department) {
    const depFound = departments.find((d) => d.value === user.department);
    department = depFound ? depFound.label : user.department;
  }
  const description = (user?.description || "אין תיאור").trim();

  // Categories: accept explicit array prop OR derive from user.categoriesCsv
  // User type label (primary category of user) replacing previous categories row
  let userTypeLabel = "לא צוין";
  if (user?.userType) {
    const utFound = userTypes.find((u) => u.value === user.userType);
    userTypeLabel = utFound ? utFound.label : user.userType;
  }
  // Removed inline category tags to rely on FreelancerSkill1 widget for consistent styling.

  return (
    <div className='price-widget pt25 bdrs8' dir='rtl'>
      <h3 className='widget-title text-center'>אודות הפרילנסר</h3>
      <div className='category-list mt20'>
        <a className='d-flex align-items-center justify-content-between bdrb1 pb-2'>
          <span className='text'>
            <i className='flaticon-place text-thm2 pe-2 vam' />
            מיקום
          </span>
          <span>{location}</span>
        </a>
        <a className='d-flex align-items-center justify-content-between bdrb1 pb-2'>
          <span className='text'>
            <i className='flaticon-30-days text-thm2 pe-2 vam' />
            חבר מאז
          </span>
          <span>{memberSince}</span>
        </a>
        <a className='d-flex align-items-center justify-content-between bdrb1 pb-2'>
          <span className='text'>
            <i className='flaticon-sliders text-thm2 pe-2 vam' />
            תפקיד
          </span>
          <span>{role}</span>
        </a>
        <a className='d-flex align-items-center justify-content-between bdrb1 pb-2'>
          <span className='text'>
            <i className='flaticon-calendar text-thm2 pe-2 vam' />
            מחלקה
          </span>
          <span>{department}</span>
        </a>
        <div className='d-flex align-items-center justify-content-between mb-3'>
          <span className='text'>
            <i className='flaticon-translator text-thm2 pe-2 vam' />
            קטיגורית משתמש
          </span>
          <span className='text-end' style={{ maxWidth: "55%" }}>
            {userTypeLabel}
          </span>
        </div>
        <div className='mb-3' style={{ lineHeight: 1.4 }}>
          <span className='fw500 d-block mb5'>תיאור:</span>
          <span style={{ whiteSpace: "pre-line" }}>{description}</span>
        </div>
      </div>
      <div className='d-grid'>
        <Link href={`/message?with=${user?.id || ""}`} className='ud-btn btn-thm'>
          צור קשר
          <i className='fal fa-arrow-right-long' />
        </Link>
      </div>
    </div>
  );
}
