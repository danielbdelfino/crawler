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
    }

    return undefined;
};

module.exports = {
    parsePageContent: parsePageContent
};