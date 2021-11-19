//não utilizar 'require' nesse modulo, pois ele é usado no puppeter e esse deve ser passando via params

const parsePageContent = function (params) {
    const { target, targets, types } = params;

    if (target === targets.meups) {
        var mainContent = document.querySelector('.main-content');

        if (mainContent && mainContent.children.length > 0) {
            var content = [];

            for (var index = 0; index < 3; index++) {
                var title = mainContent.querySelectorAll('.title')[index].innerText;

                content.push(
                    {
                        link: mainContent.querySelectorAll('.title')[index].children[0].getAttribute('href'),
                        title: title,
                        image: mainContent.querySelectorAll('.image')[index].children[0].getAttribute('data-src'),
                        type: types.games,
                        name: target,
                        selfPath: title
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
                var title = mainContent.querySelectorAll('.m')[index].children[1].innerText;

                content.push(
                    {
                        link: mainContent.querySelectorAll('.t')[index].children[0].getAttribute('href'),
                        title: title,
                        image: mainContent.querySelectorAll('.t')[index].children[0].children[0].getAttribute('src'),
                        type: types.games,
                        name: target,
                        selfPath: title
                    }
                )
            }

            return content
        } else {
            return undefined;
        }
    } else if (target === targets.g1) {
        var mainContent = document.querySelector('.bastian-page').querySelector('._l');

        if (mainContent && mainContent.children.length > 0) {
            var content = [];

            for (var index = 0; index < 3; index++) {
                console.log(mainContent.children[index]);
                var title = mainContent.children[index].querySelectorAll('.feed-post-link')[0].innerText;
                var imgPoster = mainContent.children[index].querySelectorAll('.post-media-preview__video')[0];
                var imgSrc = mainContent.children[index].querySelectorAll('.bstn-fd-picture-image')[0];
                var linkImage = imgPoster != undefined ? imgPoster.getAttribute('poster') : imgSrc.getAttribute('src');

                content.push(
                    {
                        link: mainContent.children[index].querySelectorAll('.feed-post-link')[0].getAttribute('href'),
                        title: title,
                        image: linkImage,
                        type: types.news,
                        name: target,
                        selfPath: title
                    }
                )
            }

            return content
        } else {
            return undefined;
        }
    } else if (target === targets.olhar) {
        var mainContent = document.querySelector('.post-list');

        if (mainContent && mainContent.children.length > 0) {
            var content = [];

            for (var index = 0; index < 3; index++) {
                var title = mainContent.children[index].querySelector('.post-title').innerText;
                var linkImage = mainContent.children[index].querySelector('.attachment-last-home').getAttribute('src');

                content.push(
                    {
                        link: mainContent.children[index].getAttribute('href'),
                        title: title,
                        image: linkImage,
                        type: types.tecnology,
                        name: target,
                        selfPath: title
                    }
                )
            }

            return content
        } else {
            return undefined;
        }
    } else if (target === targets.cinemarapadura) {
        var mainContent = document.querySelector('.category-list').querySelector('.f-left').querySelectorAll('a');

        if (mainContent && mainContent.length > 0) {
            var content = [];

            for (var index = 0; index < 3; index++) {
                var title = mainContent[index].getElementsByTagName('h2')[0].innerText;
                var linkImage = mainContent[index].querySelector('.cover').style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

                content.push(
                    {
                        link: mainContent[index].getAttribute('href'),
                        title: title,
                        image: linkImage,
                        type: types.entertainment,
                        name: target,
                        selfPath: title
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