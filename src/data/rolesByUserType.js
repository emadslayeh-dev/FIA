// Role lists keyed by user type value
export const rolesByUserType = {
	food_industry: [
		{ value: 'plant_manager', label: 'מנהל/ת מפעל' },
		{ value: 'production_supervisor', label: 'מפקח/ת ייצור' },
		{ value: 'process_engineer', label: 'מהנדס/ת תהליכים' },
	],
	biotech_industry: [
		{ value: 'scientific_researcher', label: 'חוקר/ת מדעי' },
		{ value: 'consultant', label: 'יועץ/ת' },
		{ value: 'clinical_trial_manager', label: 'מנהל/ת ניסויים קליניים' },
		{ value: 'data_analyst', label: 'אנליסט/ית נתונים' },
		{ value: 'software_engineer', label: 'מהנדס/ת תוכנה' },
		{ value: 'product_development_scientist', label: 'מדען/ית פיתוח מוצר' },
		{ value: 'project_manager', label: 'מנהל/ת פרויקטים' },
		{ value: 'regulatory_specialist', label: 'מומחה/ית רגולציה' },
		{ value: 'technical_sales_rep', label: 'נציג/ת מכירות טכני' },
		{ value: 'process_engineer', label: 'מהנדס/ת תהליך' },
		{ value: 'production_engineer', label: 'מהנדס/ת ייצור' },
		{ value: 'quality_engineer', label: 'מהנדס/ת איכות' },
		{ value: 'patent_attorney', label: 'עורך/ת פטנטים' },
		{ value: 'hr_manager', label: 'מנהל/ת משאבי אנוש' }
	],

	chemical_industry: [
		{ value: 'biotechnologist', label: 'ביוטכנולוג/ית' },
		{ value: 'chemical_engineer', label: 'מהנדס/ת כימיה' },
		{ value: 'color_technologist', label: 'טכנולוג/ית צבעים' },
		{ value: 'energy_engineer', label: 'מהנדס/ת אנרגיה' },
		{ value: 'geochemist', label: 'גאוכימאי/ת' },
		{ value: 'materials_engineer', label: 'מהנדס/ת חומרים' },
		{ value: 'metallurgist', label: 'מטלורג/ית' },
		{ value: 'nuclear_engineer', label: 'מהנדס/ת גרעין' },
		{ value: 'petroleum_engineer', label: 'מהנדס/ת נפט' },
		{ value: 'process_development_scientist', label: 'מדען/ית פיתוח תהליכים' },
		{ value: 'analytical_chemist', label: 'כימאי/ת אנליטי/ת' },
		{ value: 'energy_manager', label: 'מנהל/ת אנרגיה' },
		{ value: 'environmental_engineer', label: 'מהנדס/ת סביבה' },
		{ value: 'production_engineer', label: 'מהנדס/ת ייצור' },
		{ value: 'production_manager', label: 'מנהל/ת ייצור' },
		{ value: 'quality_manager', label: 'מנהל/ת איכות' },
		{ value: 'waste_management_officer', label: 'אחראי/ת ניהול פסולת' },
		{ value: 'water_engineer', label: 'מהנדס/ת מים' }
	],

	pharma_industry: [
		{ value: 'rnd_scientist', label: 'מדען/ית מחקר ופיתוח' },
		{ value: 'pharmacist', label: 'רוקח/ת' },
		{ value: 'process_engineer', label: 'מהנדס/ת תהליך' },
		{ value: 'clinical_trials_planner', label: 'מתכנן/ת ניסויים קליניים' },
		{ value: 'regulatory_affairs_specialist', label: 'אחראי/ת רגולציה' },
		{ value: 'quality_specialist', label: 'מומחה/ית איכות' },
		{ value: 'production_engineer', label: 'מהנדס/ת ייצור' },
		{ value: 'pharma_production_manager', label: 'מנהל/ת ייצור תרופות' },
		{ value: 'qa_manager', label: 'מנהל/ת אבטחת איכות' }
	],

	cosmetics_industry: [
		{ value: 'cosmetic_chemist', label: 'כימאי/ת קוסמטיקה' },
		{ value: 'analytical_chemist', label: 'כימאי/ת אנליטי/ת' },
		{ value: 'rnd_scientist', label: 'מדען/ית מחקר ופיתוח' },
		{ value: 'qa_qc_specialist', label: 'מומחה/ית QA/QC' },
		{ value: 'product_safety_specialist', label: 'מומחה/ית בטיחות מוצר' },
		{ value: 'regulatory_specialist', label: 'מומחה/ית רגולציה' },
		{ value: 'clinical_research_scientist', label: 'מדען/ית מחקר קליני' },
		{ value: 'packaging_expert', label: 'מומחה/ית אריזות' },
		{ value: 'microbiologist', label: 'מיקרוביולוג/ית' },
		{ value: 'sensory_scientist', label: 'מדען/ית סנסורי' },
		{ value: 'market_research_analyst', label: 'אנליסט/ית מחקר שוק' }
	],

	raw_material_supplier: [
		{ value: 'buyer', label: 'קניין/ית' },
		{ value: 'inventory_analyst', label: 'אנליסט/ית מלאי' },
		{ value: 'procurement_coordinator', label: 'מתאם/ת רכש' },
		{ value: 'logistics_manager', label: 'מנהל/ת לוגיסטיקה' },
		{ value: 'supply_planner', label: 'מתכנן/ת אספקות' },
		{ value: 'quality_manager', label: 'מנהל/ת איכות' },
		{ value: 'sales_rep', label: 'נציג/ת מכירות' },
		{ value: 'supply_chain_manager', label: 'מנהל/ת שרשרת אספקה' }
	],

	equipment_supplier: [
		{ value: 'sales_engineer', label: 'מהנדס/ת מכירות טכני' },
		{ value: 'technical_support_rep', label: 'נציג/ת שירות טכני' },
		{ value: 'product_manager', label: 'מנהל/ת מוצר' },
		{ value: 'service_engineer', label: 'מהנדס/ת שירות' },
		{ value: 'account_manager', label: 'מנהל/ת תיקי לקוחות' }
	],

	packaging_supplier: [
		{ value: 'packer', label: 'אורז/ת' },
		{ value: 'warehouse_worker', label: 'עובד/ת מחסן' },
		{ value: 'sorter', label: 'ממיין/ת' },
		{ value: 'assembly_technician', label: 'טכנאי/ת הרכבה' },
		{ value: 'loader', label: 'מטעין/ת' },
		{ value: 'shipping_coordinator', label: 'מתאם/ת שילוח' },
		{ value: 'product_checker', label: 'בודק/ת מוצר' },
		{ value: 'machine_operator', label: 'מפעיל/ת מכונות אריזה' },
		{ value: 'warehouse_manager', label: 'מנהל/ת מחסן' },
		{ value: 'packaging_engineer', label: 'מהנדס/ת אריזה' },
		{ value: 'packaging_designer', label: 'מעצב/ת אריזה' }
	],
	service_provider: [
		{ value: 'project_manager', label: 'מנהל/ת פרויקטים' },
		{ value: 'consultant', label: 'מייעץ/ת' },
	],
	consultant_freelancer: [
		{ value: 'tech_consultant', label: 'יועץ/ת טכנולוגי/ת' },
		{ value: 'scientific_consultant', label: 'יועץ/ת מדעי/ת' },
		{ value: 'regulatory_consultant', label: 'יועץ/ת רגולציה' },
		{ value: 'marketing_consultant', label: 'יועץ/ת שיווק' },
		{ value: 'operations_consultant', label: 'יועץ/ת תפעול (Lean/Six Sigma)' },
		{ value: 'financial_consultant', label: 'יועץ/ת פיננסי/ת' },
		{ value: 'project_manager', label: 'מנהל/ת פרויקטים' },
		{ value: 'lawyer', label: 'עורך/ת דין' },
		{ value: 'hr_consultant', label: 'יועץ/ת משאבי אנוש' },
		{ value: 'sustainability_consultant', label: 'יועץ/ת קיימות' }
	],
	research_lab: [
		{ value: 'principal_investigator', label: 'חוקר ראשי' },
		{ value: 'phd_student', label: 'דוקטורנט/ית' },
		{ value: 'postdoc', label: 'פוסט-דוקטורנט/ית' },
		{ value: 'lab_manager', label: 'מנהל/ת מעבדה' },
		{ value: 'lab_technician', label: 'טכנאי/ת מעבדה' },
		{ value: 'lab_assistant', label: 'עוזר/ת מעבדה' },
		{ value: 'bachelor_student', label: 'סטודנט/ית לתואר ראשון' },
		{ value: 'visiting_researcher', label: 'חוקר/ת אורח' }
	],
	logistics_company: [
		{ value: 'marketing_specialist', label: 'מומחה/ית שיווק' },
		{ value: 'media_planner', label: 'מתכנן/ת מדיה' },
		{ value: 'ecommerce_specialist', label: 'מומחה/ית מסחר אלקטרוני' },
		{ value: 'distribution_manager', label: 'מנהל/ת ערוצי הפצה' },
		{ value: 'buyer', label: 'קניין/ית' },
		{ value: 'logistics_manager', label: 'מנהל/ת לוגיסטיקה' },
		{ value: 'regional_sales_rep', label: 'נציג/ת מכירות אזורי/ת' },
		{ value: 'advertising_coordinator', label: 'מתאם/ת פרסום' }
	],
	marketing_sales_company: [
		{ value: 'marketing_manager', label: 'מנהל/ת שיווק' },
		{ value: 'account_manager', label: 'מנהל/ת לקוחות' },
	],
	regulatory_quality_body: [
		{ value: 'regulation_inspector', label: 'מפקח/ת רגולציה' },
		{ value: 'quality_auditor', label: 'בודק/ת איכות' },
		{ value: 'quality_engineer', label: 'מהנדס/ת איכות' },
		{ value: 'regulatory_consultant', label: 'יועץ/ת רגולציה' },
		{ value: 'third_party_auditor', label: 'מבקר/ת צד שלישי' },
		{ value: 'standards_manager', label: 'מנהל/ת תקינה' },
		{ value: 'training_coordinator', label: 'רכז/ת הדרכה' }
	],
	private_user: [
		{ value: 'private_user_role', label: 'משתמש/ת פרטי/ת' },
	],
	development_labs: [
		{ value: 'private_user_role', label: ' פרטי/ת' },
	],
	pest_control_company: [
		{ value: 'pest_technician', label: 'טכנאי/ת הדברה' },
		{ value: 'pesticide_applicator', label: 'מפעיל/ת חומרי הדברה' },
		{ value: 'termite_control_worker', label: 'עובד/ת הדברת טרמיטים' },
		{ value: 'fumigation_operator', label: 'מפעיל/ת פומיגציה' }
	],
	import_export_company: [
		{ value: 'import_export_coordinator', label: 'רכז/ת יבוא-יצוא' },
		{ value: 'freight_coordinator', label: 'מתאם/ת שילוח בינלאומי' },
		{ value: 'customs_specialist', label: 'מומחה/ית מכס' },
		{ value: 'trade_analyst', label: 'אנליסט/ית סחר חוץ' },
		{ value: 'documentation_coordinator', label: 'מתאם/ת מסמכים' },
		{ value: 'global_supply_manager', label: 'מנהל/ת שרשרת אספקה עולמית' }
	],
	marketing_distribution_companies: [
		{ value: 'marketing_specialist', label: 'מומחה/ית שיווק' },
		{ value: 'media_planner', label: 'מתכנן/ת מדיה' },
		{ value: 'ecommerce_specialist', label: 'מומחה/ית מסחר אלקטרוני' },
		{ value: 'distribution_manager', label: 'מנהל/ת ערוצי הפצה' },
		{ value: 'buyer', label: 'קניין/ית' },
		{ value: 'logistics_manager', label: 'מנהל/ת לוגיסטיקה' },
		{ value: 'regional_sales_rep', label: 'נציג/ת מכירות אזורי/ת' },
		{ value: 'advertising_coordinator', label: 'מתאם/ת פרסום' }
	],
	retail_chains: [
		{ value: 'private_user_role', label: 'משתמש/ת פרטי/ת' },
	],
	graphic_packaging_design: [
		{ value: 'private_user_role', label: 'משתמש/ת פרטי/ת' },
	],
	factory_planning: [
		{ value: 'plant_layout_designer', label: 'מעצב/ת פריסת מפעל' },
		{ value: 'industrial_engineer', label: 'מהנדס/ת תעשייה וניהול' },
		{ value: 'facilities_planner', label: 'מתכנן/ת מתקנים' },
		{ value: 'process_engineer', label: 'מהנדס/ת תהליך' },
		{ value: 'operations_manager', label: 'מנהל/ת תפעול' },
		{ value: 'materials_flow_consultant', label: 'יועץ/ת זרימת חומרים' }
	],
	branding_advertising: [
		{ value: 'creative_director', label: 'מנהל/ת קריאייטיב' },
		{ value: 'marketing_manager', label: 'מנהל/ת שיווק' },
		{ value: 'design_manager', label: 'מנהל/ת עיצוב' },
		{ value: 'art_director', label: 'ארט דיירקטור' },
		{ value: 'project_manager', label: 'מנהל/ת פרויקטים' },
		{ value: 'graphic_designer', label: 'מעצב/ת גרפי/ת' },
		{ value: 'copywriter', label: 'קופירייטר/ית' },
		{ value: 'brand_manager', label: 'מנהל/ת מותג' },
		{ value: 'art_producer', label: 'מפיק/ה אמנותי/ת' },
		{ value: 'creative_assistant', label: 'עוזר/ת קריאייטיב' },
		{ value: 'production_manager', label: 'מנהל/ת הפקה' },
		{ value: 'print_producer', label: 'מפיק/ת הדפסה' },
		{ value: 'packaging_designer', label: 'מעצב/ת אריזות' },
		{ value: 'packaging_engineer', label: 'מהנדס/ת אריזה' }
	],


	other: [
		{ value: 'other_role', label: 'אחר' },
	],
};

export const defaultRoles = [
	{ value: 'employee', label: 'עובד/ת' },
	{ value: 'manager', label: 'מנהל/ת' },
];

export default rolesByUserType;
