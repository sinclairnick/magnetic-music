const request = require('request');
const cheerio = require('cheerio');

export default (query: string, page = 1) => new Promise((resolve, reject) => {

  const result = [];
  const option = { url: `https://btdb.to/q/${encodeURIComponent(query)}/${page}?sort=popular` };
  request(option, (err, res, html) => {
    if (err) reject(err);
    const $ = cheerio.load(html);
    const elems = $('li[class=search-ret-item]');

    if (!elems) reject('Found no BTDB results.');

    elems.each((index, element) => {

      const magnet = $(element).find('a.magnet').attr('href');
      const name = $(element).find('.item-title a').attr('title');
      const size = $(element).find('.item-meta-info-value').eq(0).text();
      const popularity = Math.floor($(element).find('.item-meta-info-value').eq(3).text() / 1000);

      result.push({ magnet, name, size, popularity });

      if (elems.length - 1 === index) resolve(result);
    });
  });
})