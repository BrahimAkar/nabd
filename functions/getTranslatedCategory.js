exports.getTranslatedCategory = (categoryName) => {
	switch (categoryName) {
		case 'Urgent':
			return 'عاجل';
		case 'Morocco':
			return 'المغرب';
		case 'World':
			return 'العالم';
		case 'Sport':
			return 'الرياضة';
		case 'Economy':
			return 'إقتصاد';
		case 'Health':
			return 'الصحة';
		case 'Technology':
			return 'التكنولوجيا';
		case 'Cars':
			return 'السيارات';
		case 'Women':
			return 'المرأة';
		case 'Knowledge':
			return 'المعرفة';
		case 'Cooking':
			return 'الطبخ';
		case 'Tourist':
			return 'السياحة';
		case 'Kuwait':
			return 'الكويت';
		case 'SaudiArabia':
			return 'السعودية';
		case 'Egypt':
			return 'مصر';
		case 'Emirates':
			return 'الإمارات';
		case 'Lebanon':
			return 'لبنان';
		case 'Bahrain':
			return 'البحرين';
		case 'Jordan':
			return 'الأردن';
		case 'Palestine':
			return 'فلسطين';
		case 'Yemen':
			return 'اليمن';
		case 'Libya':
			return 'ليبيا';
		case 'Tunisia':
			return 'تونس';
		case 'Oman':
			return 'عمان';
		case 'Iraq':
			return 'العراق';
		case 'Algeria':
			return 'الجزائر';
		default:
			return 'لاتوجد ترجمة';
	}
};
