//const { types } = require('./constants');
// const  parseMeuPS = function(pageContent) {
//     return pageContent.subtitle;
// };

const parsePageContent = function (params) {
    const { target, targets, types } = params;

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
                        type: types.games,
                        name: target
                    }
                )
            }

            return content;
        } else {
            return undefined;
        }
    } else if (target === targets.ignxbox || target === targets.ignpc) {
        //document.querySelector('.tbl').querySelectorAll('.t')[0].children[0].getAttribute('href')
        //document.querySelector('.tbl').querySelectorAll('.m')[0].children[1].innerText
        //document.querySelector('.tbl').querySelectorAll('.t')[0].children[0].children[0].getAttribute('src')

        var mainContent = document.querySelector('.tbl');

        if (mainContent && mainContent.children.length > 0) {
            var content = [];

            for (var index = 0; index < 3; index++) {
                content.push(
                    {
                        link: mainContent.querySelectorAll('.t')[index].children[0].getAttribute('href'),
                        title: mainContent.querySelectorAll('.m')[index].children[1].innerText,
                        image: mainContent.querySelectorAll('.t')[index].children[0].children[0].getAttribute('src'),
                        type: types.games,
                        name: target
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