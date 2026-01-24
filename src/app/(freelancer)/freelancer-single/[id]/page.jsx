import Header7 from "@/components/header/Header7";
import Footer4 from "@/components/footer/Footer4";
import prisma from "@/lib/prisma";

export const metadata = { title: "פרופיל משתמש" };

function splitCategories(csv) {
  if (!csv) return [];
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function Page({ params }) {
  const { id } = params || {};
  let user = null;
  if (id) {
    try {
      user = await prisma.user.findUnique({
        where: { id: String(id) },
        include: { company: true },
      });
    } catch (e) {
      console.error("FREELANCER_PAGE_FETCH_FAILED", e);
    }
  }

  if (!user) {
    return (
      <>
        <Header7 />
        <div className='container py-5'>
          <div className='alert alert-danger'>הפרופיל לא נמצא.</div>
        </div>
        <Footer4 />
      </>
    );
  }

  const categories = splitCategories(user.categoriesCsv);

  return (
    <>
      <Header7 />
      <section className='py-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='bgc-white p30 bdrs12 mb30 default-box-shadow1'>
                <div className='d-flex align-items-center' style={{ gap: 24 }}>
                  {user.profileImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.profileImageUrl}
                      alt='profile'
                      style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 40,
                        color: "#999",
                      }}>
                      {user.firstName?.[0] || "?"}
                    </div>
                  )}
                  <div>
                    <h3 className='mb10'>
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className='mb5'>תפקיד: {user.role || "לא צוין"}</p>
                    <p className='mb5'>מחלקה: {user.department || "לא צוין"}</p>
                    <p className='mb5'>סוג משתמש: {user.userTypeOther || user.userType}</p>
                    {user.company && (
                      <p className='mb0'>
                        חברה: {user.company.nameHe}
                        {user.company.nameEn ? ` / ${user.company.nameEn}` : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className='bgc-white p30 bdrs12 mb30 default-box-shadow1'>
                <h5 className='mb20'>קטגוריות עיסוק</h5>
                {categories.length ? (
                  <ul className='list-inline'>
                    {categories.map((c) => (
                      <li key={c} className='list-inline-item mb10'>
                        <span className='badge bg-primary rounded-pill'>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-muted'>לא נבחרו קטגוריות.</p>
                )}
              </div>

              <div className='bgc-white p30 bdrs12 mb30 default-box-shadow1'>
                <h5 className='mb20'>מידע נוסף</h5>
                <div className='row'>
                  <div className='col-md-6 mb15'>אימייל: {user.email}</div>
                  <div className='col-md-6 mb15'>מדינה: {user.country || ""}</div>
                  <div className='col-md-6 mb15'>עסק משויך: {user.companyId ? "כן" : "לא"}</div>
                  <div className='col-md-6 mb15'>אומת אימייל: {user.emailVerifiedAt ? "כן" : "לא"}</div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='bgc-white p30 bdrs12 default-box-shadow1'>
                <h5 className='mb20'>פעולות עתידיות</h5>
                <ul className='list-unstyled mb0'>
                  <li className='mb10'>עריכת פרופיל (בהמשך)</li>
                  <li className='mb10'>ניהול תגיות ומיומנויות</li>
                  <li className='mb10'>העלאת מסמכי תיק עבודות</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer4 />
    </>
  );
}
