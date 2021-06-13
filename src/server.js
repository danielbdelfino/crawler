//const puppeteer = require('puppeteer');
const express = require('express');
//const storage = require('./storage/storage');
// const parser = require('./util/parser')
// const constants = require('./util/constants');
const jobs = require('./schedule/jobs');
const { types } = require('./util/constants');
const storage = require('./storage/storage');
const cors = require('cors');

const server = express();

server.use(cors({origin:true,credentials: true}));

server.get('/', async (request, response) => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    //await page.goto('https://www.alura.com.br/formacao-front-end');
    // await page.goto('https://meups.com.br/');
    //console.log(parser);

    //const pageContent = await page.evaluate(parser.parsePageContent, {page: constants.MEU_PS, constants: constants});
    // const pageContent = await page.evaluate((parser) => {
    //     //return document.querySelectorAll('body');
    //     //return document.querySelector('.main-content');
    //     console.log(parser.parsePageContent);
    //     var mainContent = document.querySelector('.main-content');

    //     // return {
    //     //     link: 'Teste link',
    //     //     title: 'Teste link',
    //     //     image: 'iamgem'
    //     // };

    //     return {
    //         mainContent: parser.parsePageContent(document.querySelector('.main-content'))
    //     }

    //     // if (mainContent && mainContent.children.length > 0) {
    //     //     return {
    //     //     //   width: document.documentElement.clientWidth,
    //     //     //   height: document.documentElement.clientHeight,
    //     //     //   deviceScaleFactor: window.devicePixelRatio,
    //     //         //subtitle: document.querySelector('.fomacao-headline-subtitulo').innerHTML,
    //     //         //subtitle: document.querySelector('.formacao-headline-subtitulo').textContent,
    //     //         link: mainContent.querySelectorAll('.title')[0].children[0].getAttribute('href'),
    //     //         title: mainContent.querySelectorAll('.title')[0].innerText,
    //     //         image: mainContent.querySelectorAll('.image')[0].children[0].getAttribute('data-src'),
    //     //         mainContent: mainContent.innerHTML,
    //     //         documentElement: document.documentElement
    //     //     };
    //     // } else {
    //     //     return undefined;
    //     // }
    // }, parser);
    // .then(function(req, res, next) {
    //     //console.log(constants.MEU_PS);
    //     // console.log(document);
    //     parsedPageContent = parser.parsePageContent(req.mainContent, constants.MEU_PS); 
    //     // console.log(parsedPageContent);
    //     // response.send({
    //     //     request: "Pagina MEUPS",
    //     //     image: parsedPageContent.image,
    //     //     title: parsedPageContent.title,
    //     //     link: parsedPageContent.link
    //     //     // subtitle: pageContent.subtitle
    //     // });
    // });

    //pegar dados da pagina da alura
    //await browser.close();

    //console.log(pageContent)
    //console.log(storage.manipulaHtml(pageContent))
    //console.log(pageContent);

    response.send({
        request: "Pagina MEUPS"
        //image: pageContent.image,
        //title: pageContent.title,
        //link: pageContent.link
        // subtitle: pageContent.subtitle
    });
});

server.get('/games', async (request, response) => {
    storage.findContent(types.games, function (results) {
        console.log(results);
        response.send({
            results
            //request: "Pagina MEUPS"
            //image: pageContent.image,
            //title: pageContent.title,
            //link: pageContent.link
            // subtitle: pageContent.subtitle
        });
    });

});

// server.get('/testedois', (request, response) => {
//     response.send('Olá mundo 2!!');
// });

server.listen(3000, () => {
    console.log(`
        Servidor subiu!
        Acesse em http://localhost:3000
    `)
});



// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.alura.com.br/formacao-front-end');
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();