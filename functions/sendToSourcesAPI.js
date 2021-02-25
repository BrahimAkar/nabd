const axios = require('axios');

exports.sendToSourcesAPI = async (categoryTranslated, mediaLogo, mediaName) => {
	axios
		.post('http://localhost:3006/api/v1/sources', {
			sourcesLanguage: 'ar',
			category: categoryTranslated,
			media: [
				{
					mediaName: mediaName,
					mediaLogo: mediaLogo,
				},
			],
		})
		.then((res) => {})
		.catch((error) => {
			console.error(error);
		});
};
