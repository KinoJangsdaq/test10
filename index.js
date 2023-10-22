const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

var cors= require('cors') // cors
app.use(cors()) // cors

app.get('/:name', (req, res)=> {
   const {name}= req.params;
   console.log('req params', name);

   if (name== "dog"){
      res.json({'sound':'mung mung'});
   } else if (name== "cat"){
      res.json({'sound':'yaong'});
   }
});

app.get('/screenshot', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 원하는 URL로 이동 (여기서는 localhost:3000)
    await page.goto('https://www.vacationstogo.com/');

    // 스크린샷 찍기
    const screenshotBuffer = await page.screenshot();

    await browser.close();

    // 스크린샷 버퍼 데이터를 base64 형식으로 변환하고 JSON 응답으로 반환
    res.json({ screenshot: screenshotBuffer.toString('base64') });
});

app.listen(5500);
