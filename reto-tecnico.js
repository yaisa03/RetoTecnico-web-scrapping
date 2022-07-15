const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function scrapSlides() {
    const baseUrl = 'https://slides.com';
    try {
        const response = await fetch(baseUrl+'/explore');
        const body = await response.text();
        const $ = cheerio.load(body);
        const items = [];

        $('.sl-deck-thumbnail').map((i, el) => {
            const link = $(el).find('a').attr('href');
            const title = $(el).find('.title').text();
            items.push({
                title,
                link: baseUrl+link
            });
        });
        //console.table(items);
        const transformed = items.reduce((acc, { title, ...x }) => { acc[title] = x; return acc }, {});
        console.table(transformed);
    } catch (error) {
        console.log(error);
    }
}

scrapSlides();