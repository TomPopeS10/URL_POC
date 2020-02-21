const puppeteer = require('puppeteer');

const testArr = [
  'http://a4mrfc3s5y2z.map.legalandgeneralgroup.com',
  'http://about.legalandgeneral.com',
  'https://bbc.co.uk/news',
  'https://www.bbc.co.uk/news'
];

// const delay = ms => new Promise(res => setTimeout(res, ms));

const run = async () => {
  let outputArr = [];
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  for (const url of testArr) {
    let responseMsg;
    try {
      await page.goto(url);
      // await delay(1000);
      page.url() === url
        ? (responseMsg = 'active')
        : (responseMsg = 'redirect');
    } catch (error) {
      responseMsg = 'inactive';
    }

    const urlObj = {
      URL: url,
      Msg: responseMsg
    };

    outputArr.push(urlObj);
  }
  console.log(outputArr);
  browser.close();
};

run();
