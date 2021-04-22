// const constants = require('./constants');

// const  parseMeuPS = function(pageContent) {
//     return pageContent.subtitle;
// };

const parsePageContent = function (params) {
    const { target, targets } = params;

    if (target === targets.meups) {
        var mainContent = document.querySelector('.main-content');

        if (mainContent && mainContent.children.length > 0) {
            var content = [];

            for (var index = 0; index < 3; index++) {
                content.push(
                    {
                        link: mainContent.querySelectorAll('.title')[index].children[0].getAttribute('href'),
                        title: mainContent.querySelectorAll('.title')[index].innerText,
                        image: mainContent.querySelectorAll('.image')[index].children[0].getAttribute('data-src'),
                    }
                )
            }

            return content
        } else {
            return undefined;
        }
    }

    return undefined;
};

module.exports = {
    parsePageContent: parsePageContent
};