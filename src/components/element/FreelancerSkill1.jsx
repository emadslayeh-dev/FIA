export default function FreelancerSkill1({ categories }) {
  const items = Array.isArray(categories)
    ? categories.filter(Boolean)
    : typeof categories === "string" && categories.trim()
      ? categories
          .split(/[,•]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
  return (
    <div className='sidebar-widget mb30 pb20 bdrs8' dir='rtl'>
      <h4 className='widget-title text-center'>קטיגוריות עיסוק</h4>
      <div className='tag-list mt30'>
        {items.length === 0 && <span style={{ opacity: 0.7 }}>אין קטגוריות</span>}
        {items.map((c, i) => (
          <a key={i}>{c}</a>
        ))}
      </div>
    </div>
  );
}
