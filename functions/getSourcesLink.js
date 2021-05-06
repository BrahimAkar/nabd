const axios = require("axios");
const { parse } = require('node-html-parser');

exports.getSourcesLink = async (id) => {
    axios({
        method: 'POST',
        url: `http://nabdapp.com/original_story.php?aid=${id}`,
    })
        .then(function (response) {
            const root = parse(response.data);
            const link = root.querySelectorAll('meta')[2].getAttribute("content");
            const formattedLink = link.split("0;url=")[1].split("?utm")[0];
            //  console.log(link.split(/[.\0;url=utm_]/));
            return formattedLink;
        })
        .catch(function (error) {
            return null;
        });
}


