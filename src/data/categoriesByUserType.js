// Example categories per user type for multi-select
export const categoriesByUserType = {
	food_industry: [
		{ value: 'meat_processing', label: 'עיבוד בשר ועופות' },
		{ value: 'dairy_products', label: 'מוצרי חלב ויוגורט' },
		{ value: 'bakery_biscuits', label: 'מאפים וביסקוויטים' },
		{ value: 'snacks', label: 'חטיפים' },
		{ value: 'beverages', label: 'משקאות קלים ובירה' },
		{ value: 'confectionery', label: 'ממתקים ושוקולד' },
		{ value: 'frozen_foods', label: 'מזון קפוא' },
		{ value: 'canned_foods', label: 'מזון משומר' },
		{ value: 'grains_flours', label: 'דגנים וקמחים' },
		{ value: 'spices_sauces', label: 'תבלינים ורטבים' }
	],

	biotech_industry: [
		{ value: 'medical_biotech', label: 'ביוטכנולוגיה רפואית (תרופות, חיסונים)' },
		{ value: 'industrial_biotech', label: 'ביוטכנולוגיה תעשייתית (אנזימים ותסיסות)' },
		{ value: 'environmental_biotech', label: 'ביוטכנולוגיה סביבתית (ביורמדציה וטיפול בשפכים)' },
		{ value: 'plant_biotech', label: 'ביוטכנולוגיה צמחית (הנדסה גנטית ושיפור יבולים)' },
		{ value: 'animal_biotech', label: 'ביוטכנולוגיה של בעלי חיים' }
	],

	chemical_industry: [
		{ value: 'basic_chemicals', label: 'כימיקלים בסיסיים (פטרוכימיה, פולימרים, תרכובות אנאורגניות)' },
		{ value: 'specialty_chemicals', label: 'כימיקלים מיוחדים (דלקים ביולוגיים, צבעים, פיגמנטים, חומרי ניקוי)' },
		{ value: 'consumer_chemicals', label: 'כימיקלים לצרכנים (מוצרי היגיינה וקוסמטיקה)' },
		{ value: 'solvents', label: 'ממסים' },
		{ value: 'acids_bases', label: 'חומצות ובסיסים' },
		{ value: 'thermoplastic_polymers', label: 'פולימרים תרמופלסטיים' },
		{ value: 'organic_inorganic_chemicals', label: 'כימיקלים אורגניים ואנאורגניים' }
	],

	pharma_industry: [
		{ value: 'painkillers', label: 'משככי כאבים' },
		{ value: 'antacids', label: 'נוגדי חומצה' },
		{ value: 'anti_anxiety', label: 'נוגדי חרדה' },
		{ value: 'anti_arrhythmics', label: 'נוגדי הפרעות קצב' },
		{ value: 'antibacterial', label: 'אנטיבקטריאליים' },
		{ value: 'antibiotics', label: 'אנטיביוטיקה' },
		{ value: 'anticoagulants', label: 'נוגדי קרישה/תסחיפים' },
		{ value: 'anticonvulsants', label: 'נוגדי פרכוסים' },
		{ value: 'antidepressants', label: 'נוגדי דיכאון' },
		{ value: 'antidiarrheals', label: 'נוגדי שלשול' },
		{ value: 'antiemetics', label: 'נוגדי בחילה' },
		{ value: 'antifungals', label: 'נוגדי פטריות' },
		{ value: 'antihistamines', label: 'אנטי-היסטמינים' },
		{ value: 'antihypertensives', label: 'נוגדי יתר לחץ דם' },
		{ value: 'anti_inflammatories', label: 'נוגדי דלקת' },
		{ value: 'chemotherapy_drugs', label: 'תרופות כימותרפיות' },
		{ value: 'antipsychotics', label: 'תרופות אנטי-פסיכוטיות' },
		{ value: 'antipyretics', label: 'נוגדי חום' },
		{ value: 'antivirals', label: 'אנטי-ויראליים' },
		{ value: 'beta_blockers', label: 'חסמי בטא' },
		{ value: 'bronchodilators', label: 'מרחיבי סימפונות' },
		{ value: 'cold_remedies', label: 'תרופות להצטננות' },
		{ value: 'corticosteroids', label: 'קורטיקוסטרואידים' }
	],

	cosmetics_industry: [
		{ value: 'makeup_cosmetics', label: 'איפור וקוסמטיקה צבעונית (מייק-אפ, מסקרות, צלליות)' },
		{ value: 'skin_care', label: 'טיפוח עור (קרמים, לחויות, ניקוי)' },
		{ value: 'hair_care', label: 'טיפוח שיער (שמפו, מרככים, מחליקים, צבעי שיער)' },
		{ value: 'bath_products', label: 'מוצרי רחצה (שמנים, מלחים, קצף אמבט)' },
		{ value: 'fragrances', label: 'בישום וניחוחות (פרפיום, קולון, טלק)' },
		{ value: 'baby_products', label: 'מוצרים לתינוקות (שמפו, קרמים, מגבונים)' }
	],

	raw_material_supplier: [
		{ value: 'grains', label: 'דגנים' },
		{ value: 'flour', label: 'קמח' },
		{ value: 'sugar', label: 'סוכר' },
		{ value: 'oils', label: 'שמנים' },
		{ value: 'milk', label: 'חלב' },
		{ value: 'meat', label: 'בשר' },
		{ value: 'fruits_vegetables', label: 'פירות וירקות' },
		{ value: 'spices', label: 'תבלינים' },
		{ value: 'enzymes_probiotics', label: 'אנזימים ופרוביוטיקה' },
		{ value: 'cell_cultures_vitamins', label: 'תרביות תאים וויטמינים' },
		{ value: 'chemicals', label: 'כימיקלים (חומצות, בסיסים, ממסים, פולימרים, צבעים)' },
		{ value: 'pharma_ingredients', label: 'חומרים פעילים ו"אקסיפיינטים" לתרופות' },
		{ value: 'packaging_materials', label: 'בקבוקים, פקקים, שקיות, קרטונים ופחיות' },
		{ value: 'cleaning_materials', label: 'חומרי ניקוי וחיטוי' }
	],

	equipment_supplier: [
		{ value: 'washing_cutting_machines', label: 'מכונות שטיפה, קילוף וחיתוך' },
		{ value: 'mixers_grinders', label: 'מערבלים ומטחנות' },
		{ value: 'ovens_fryers_pasteurizers', label: 'תנורים, מטגנות ומכונות פסטור' },
		{ value: 'chillers_freezers', label: 'צ’ילרים ומקפיאים' },
		{ value: 'filling_sealing_packaging', label: 'מכונות מילוי, סגירה ועטיפה' },
		{ value: 'dryers_sterilizers', label: 'מייבשים וסטריליזטורים' },
		{ value: 'lab_equipment', label: 'ציוד מעבדה (מיקרוסקופים, סרכוזים, PCR, אינקובטורים, מאזניים)' },
		{ value: 'bioreactors_fermentors', label: 'ביוריאקטורים ופרמנטורים' },
		{ value: 'tablet_capsule_machines', label: 'מכונות דחיסת טבליות ומילוי כמוסות' },
		{ value: 'chemical_reactors', label: 'ריאקטורים וטורי דיסטילציה כימיים' }
	],

	packaging_supplier: [
		{ value: 'plastic_films', label: 'סרטי פלסטיק ואריזות קשיחות' },
		{ value: 'pet_pvc_bottles', label: 'בקבוקי PET ו-PVC' },
		{ value: 'metal_cans', label: 'פחיות פח ואלומיניום' },
		{ value: 'cartons_boxes', label: 'קרטונים וקופסאות קרטון' },
		{ value: 'glass_bottles', label: 'בקבוקי זכוכית' },
		{ value: 'flexible_pouches', label: 'שקיות גמישות ופאוצ’ים' },
		{ value: 'eco_materials', label: 'חומרים אקולוגיים (נייר ממוחזר, בד)' },
		{ value: 'labels_caps', label: 'תוויות ופקקים' }
	],

	service_provider: [
		{ value: 'rnd_services', label: 'מחקר ופיתוח' },
		{ value: 'regulatory_consulting', label: 'ייעוץ רגולטורי ועמידה בתקנים (FDA, EMA, ISO, HACCP)' },
		{ value: 'quality_testing', label: 'בקרת איכות ובדיקות אנליטיות' },
		{ value: 'marketing_branding', label: 'שיווק ומיתוג' },
		{ value: 'design_packaging', label: 'עיצוב ואריזות' },
		{ value: 'supply_chain_management', label: 'ניהול שרשרת אספקה (רכש, מלאי ולוגיסטיקה)' },
		{ value: 'equipment_maintenance', label: 'תחזוקה והתקנת ציוד' },
		{ value: 'financial_legal_services', label: 'שירותים פיננסיים ומשפטיים' },
		{ value: 'recruitment_training', label: 'גיוס והדרכות' },
		{ value: 'data_analysis', label: 'ניתוח נתונים ובינה עסקית' },
		{ value: 'environmental_consulting', label: 'ייעוץ סביבתי ו-ESG' }
	],

	consultant_freelancer: [
		{ value: 'tech_consulting', label: 'ייעוץ טכנולוגי/הנדסי' },
		{ value: 'scientific_consulting', label: 'ייעוץ מדעי (ביוכימיה, מיקרוביולוגיה, פרמקולוגיה)' },
		{ value: 'regulatory_consulting', label: 'ייעוץ רגולטורי' },
		{ value: 'marketing_consulting', label: 'ייעוץ שיווקי' },
		{ value: 'operations_consulting', label: 'ייעוץ תפעולי (Lean/Six Sigma)' },
		{ value: 'financial_consulting', label: 'ייעוץ פיננסי' },
		{ value: 'project_management', label: 'ניהול פרויקטים' },
		{ value: 'legal_consulting', label: 'ייעוץ משפטי' },
		{ value: 'hr_consulting', label: 'ייעוץ משאבי אנוש' },
		{ value: 'sustainability_consulting', label: 'ייעוץ סביבתי וקיימות' }
	],

	research_lab: [
		{ value: 'universities', label: 'אוניברסיטאות ומכוני מחקר ציבוריים' },
		{ value: 'cro_cmo', label: 'CRO/CMO פרטיים' },
		{ value: 'pilot_formulation_labs', label: 'מעבדות פיילוט ופורמולציה' },
		{ value: 'analytical_microbio_labs', label: 'מעבדות אנליטיות ומיקרוביולוגיות' },
		{ value: 'clinical_labs', label: 'מעבדות קליניות' },
		{ value: 'tech_transfer_units', label: 'יחידות העברת טכנולוגיה ומסחור ידע' },
		{ value: 'standard_testing_labs', label: 'מעבדות בדיקה לאישור תקנים' }
	],

	logistics_company: [
		{ value: 'warehouse_management', label: 'ניהול מחסנים (ייבשים, קירור וחומרים מסוכנים)' },
		{ value: 'land_transport', label: 'הובלה יבשתית (משאיות, רכבות)' },
		{ value: 'sea_air_transport', label: 'הובלה ימית ואווירית' },
		{ value: 'courier_services', label: 'שירותי בלדרות' },
		{ value: 'inventory_erp_wms', label: 'ניהול מלאי ומערכות ERP/WMS' },
		{ value: 'import_export_customs', label: 'יבוא/יצוא ומכס' },
		{ value: 'packaging_shipping', label: 'אריזה ושילוח' },
		{ value: 'last_mile_logistics', label: 'לוגיסטיקה אחרונה (last-mile)' },
		{ value: 'reverse_logistics', label: 'לוגיסטיקה הפוכה (החזרות ומיחזור)' },
		{ value: 'third_party_logistics', label: '3PL' },
		{ value: 'ecommerce_logistics', label: 'לוגיסטיקה למסחר אלקטרוני' },
		{ value: 'sustainable_solutions', label: 'פתרונות בני קיימא' }
	],
	marketing_sales_company: [
		{ value: 'retail_trade', label: 'מסחר קמעונאי (חנויות ורשתות)' },
		{ value: 'wholesale_trade', label: 'סחר סיטונאי' },
		{ value: 'ecommerce_payments', label: 'מסחר אלקטרוני ופתרונות סליקה' },
		{ value: 'digital_marketing', label: 'שיווק דיגיטלי (SEO, PPC, רשתות חברתיות)' },
		{ value: 'branding_management', label: 'מיתוג וניהול מותגים' },
		{ value: 'public_relations', label: 'יחסי ציבור וקשרי מדיה' },
		{ value: 'marketing_intelligence', label: 'מודיעין שיווקי (מחקר שוק, ניתוח מתחרים)' },
		{ value: 'product_management', label: 'ניהול מוצר' },
		{ value: 'content_creation', label: 'יצירת תוכן' }
	],

	regulatory_quality_body: [
		{ value: 'government_bodies', label: 'גופי ממשל (משרד הבריאות, משרד החקלאות, FDA, EMA, EFSA)' },
		{ value: 'standards', label: 'תקנים (ISO, HACCP, GFSI)' },
		{ value: 'kosher_halal', label: 'גופי כשרות וחלאל' },
		{ value: 'internal_quality', label: 'מחלקות איכות פנימיות (QA/QC)' },
		{ value: 'third_party_auditors', label: 'חברות ביקורת צד שלישי' },
		{ value: 'regulatory_consulting', label: 'ייעוץ רגולטורי' },
		{ value: 'training_certification', label: 'הדרכה והכשרה לתקנים' },
		{ value: 'certification_institutes', label: 'מכוני הסמכה' },
		{ value: 'international_organizations', label: 'ארגונים בינלאומיים (WHO, FAO)' }
	],

	private_user: [
		{ value: 'home_consumption', label: 'צריכה ביתית – מזון ומשקאות' },
		{ value: 'personal_care', label: 'מוצרי טיפוח אישי ויופי (שמפו, קרמים, איפור)' },
		{ value: 'home_cleaning', label: 'מוצרי ניקיון ותחזוקת הבית (דטרגנטים, ניירות סופגים)' },
		{ value: 'otc_supplements', label: 'תרופות ללא מרשם ותוספי תזונה' },
		{ value: 'pet_products', label: 'מוצרי חיות מחמד (מזון, חטיפים, טיפוח)' },
		{ value: 'baby_products', label: 'מוצרי תינוקות וילדים (חיתולים, מגבונים, פורמולות)' },
		{ value: 'disposables', label: 'מוצרי נייר חד-פעמיים (מפיות, צלחות, כוסות)' }
	],

	development_labs: [
		{ value: 'food_biotech_chemistry_labs', label: 'מעבדות מחקר ופיתוח לתחומי מזון, ביוטק וכימיה' },
		{ value: 'clinical_labs', label: 'מעבדות קליניות (בדיקות דם, שתן)' },
		{ value: 'biosafety_labs', label: 'מעבדות בטיחות ביולוגית (BSL)' },
		{ value: 'pilot_production_labs', label: 'מעבדות ייצור (scaling up ותהליכי פיילוט)' },
		{ value: 'quality_testing_labs', label: 'מעבדות בדיקה ובקרת איכות' },
		{ value: 'sensory_labs', label: 'מעבדות סנסוריקה והערכת טעם' }
	],

	pest_control_company: [
		{ value: 'residential_pest_control', label: 'הדברת מזיקים במגזר הפרטי (בתי מגורים)' },
		{ value: 'commercial_pest_control', label: 'הדברת מזיקים במגזר העסקי (מפעלים, מסעדות)' },
		{ value: 'termite_control', label: 'הדברת טרמיטים (פיתיונות, טיפולים כימיים וביולוגיים)' },
		{ value: 'wildlife_management', label: 'ניהול והעברה של חיות בר מזיקות' },
		{ value: 'mosquito_tick_control', label: 'הדברת יתושים וקרציות בשטחים פתוחים' },
		{ value: 'integrated_pest_management', label: 'שיטות הדברה ביולוגיות, מכניות וכימיות' }
	],

	import_export_company: [
		{ value: 'export_trading_company', label: 'חברות סחר יצוא (ETC) – חיבור יצרנים עם שווקים בינלאומיים' },
		{ value: 'export_management_company', label: 'חברות ניהול יצוא (EMC) – מציאת מפיצים, שילוח וניירת' },
		{ value: 'import_export_merchants', label: 'סוחרי ייבוא-יצוא – קנייה ומכירה ישירה של מוצרים' }
	],

	marketing_distribution_companies: [
		{ value: 'marketing_services', label: 'שירותי שיווק – מסורתי ודיגיטלי' },
		{ value: 'direct_channels', label: 'ערוצי הפצה ישירים – מסחר אלקטרוני, חנויות מותג, מכירות ישירות' },
		{ value: 'indirect_channels', label: 'ערוצי הפצה עקיפים – סיטונאים, רשתות, סוכנים, מתווכים' },
		{ value: 'hybrid_channels', label: 'ערוצים היברידיים – שילוב בין אונליין לחנויות פיזיות' },
		{ value: 'franchise_models', label: 'מודלים של זכיינות ותפעול רב-ערוצי' }
	],

	retail_chains: [
		{ value: 'department_stores', label: 'בתי כלבו (מגוון רחב של מוצרים)' },
		{ value: 'specialty_stores', label: 'חנויות מתמחות (אלקטרוניקה, קוסמטיקה, נעלי ספורט)' },
		{ value: 'supermarkets', label: 'סופרמרקטים ומרכולים' },
		{ value: 'convenience_stores', label: 'חנויות נוחות' },
		{ value: 'discount_stores', label: 'חנויות דיסקאונט' },
		{ value: 'online_retail', label: 'קמעונאות אונליין' },
		{ value: 'warehouse_clubs', label: 'מחסני מועדון ומכירה סיטונאית' },
		{ value: 'direct_to_consumer', label: 'חנויות מכירה ישירה לצרכן' },
		{ value: 'popup_shops', label: 'חנויות פופ-אפ' }
	],

	graphic_packaging_design: [
		{ value: 'visual_brand_design', label: 'עיצוב חזותי ומיתוג (לוגואים, טיפוגרפיה, פלטות צבעים)' },
		{ value: 'marketing_design', label: 'עיצוב שיווקי ופרסומי' },
		{ value: 'ui_ux_design', label: 'עיצוב ממשק משתמש ודיגיטל' },
		{ value: 'print_design', label: 'עיצוב לפרסום ודפוס (ספרים, מגזינים)' },
		{ value: 'packaging_design', label: 'עיצוב אריזות – תכנון שכבות, צורות וחוויית פתיחה' },
		{ value: 'material_based_design', label: 'עיצוב אריזות לפי חומר (קרטון, פלסטיק, זכוכית, מתכת)' },
		{ value: 'environmental_design', label: 'עיצוב גרפי סביבתי ותערוכות' },
		{ value: 'illustration_animation', label: 'איור ואנימציה' },
		{ value: 'label_regulatory_design', label: 'עיצוב תוויות וסימון רגולטורי' }
	],
	factory_planning: [
		{ value: 'plant_location_design', label: 'תכנון מיקום מפעל, אדריכלות ופריסת שטח' },
		{ value: 'process_layout', label: 'פריסת תהליך (Process Layout) – קבוצת מכונות לפי סוג תהליך לגמישות בייצור מגוון מוצרים' },
		{ value: 'product_layout', label: 'פריסת מוצר (Product/Assembly Layout) – הצבת מכונות בסדר לינארי לייצור מאסיבי ורציף' },
		{ value: 'fixed_position_layout', label: 'פריסת מיקום קבוע (Fixed-Position Layout) – המוצר נשאר במקום וצוותים נעים סביבו' },
		{ value: 'cellular_layout', label: 'פריסת תאים (Cellular Layout) – חלוקה לתאים קטנים של מכונות ועובדים לביצוע שלבים קומפקטיים' },
		{ value: 'material_flow_planning', label: 'תכנון זרימת חומר וחומרי גלם' },
		{ value: 'energy_water_systems', label: 'תכנון מערכות אנרגיה ומים' },
		{ value: 'safety_quality_compliance', label: 'עמידה בתקני בטיחות ואיכות' },
		{ value: 'internal_logistics_storage', label: 'לוגיסטיקה פנימית ואחסון' },
		{ value: 'scalable_modular_models', label: 'גמישות להרחבה עתידית ומודלים מודולריים' }
	],

	branding_advertising: [
		{ value: 'brand_identity', label: 'פיתוח זהות מותג – לוגו, שם, סגנון וקול מותג' },
		{ value: 'brand_guidelines', label: 'גיבוש קווי מנחה למיתוג וניהול מותג קיים' },
		{ value: 'traditional_advertising', label: 'פרסום מסורתי – טלוויזיה, רדיו, עיתונות, מגזינים ובילבורדים' },
		{ value: 'digital_advertising', label: 'פרסום דיגיטלי – SEO, PPC, שיווק בדוא״ל וברשתות חברתיות' },
		{ value: 'web_design_development', label: 'עיצוב ופיתוח אתרים' },
		{ value: 'content_creation_management', label: 'יצירת תוכן וניהול קמפיינים' },
		{ value: 'social_media_optimization', label: 'מדיה חברתית ואינטראקטיבית – תכנון פרופילים, פוסטים ובלוגים' },
		{ value: 'video_production', label: 'הפקת סרטונים ותוכן אינטראקטיבי' },
		{ value: 'creative_boutique', label: 'בוטיקי קריאייטיב – שירותי יצירה, תכנון אסטרטגי והפקת תוכן' },
		{ value: 'media_buying', label: 'רכש מדיה – בחירת ערוצים ומיקומים לפרסום מודעות' },
		{ value: 'public_relations', label: 'יחסי ציבור – ניהול תדמית וחשיפה ציבורית, כתבות במדיה מקומית ודיגיטלית' }
	],
	other: [
		{ value: 'other_role', label: 'אחר' },
	],
};

export default categoriesByUserType;
