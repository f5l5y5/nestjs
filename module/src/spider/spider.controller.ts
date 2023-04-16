import { Controller, Get } from '@nestjs/common';
import { SpiderService } from './spider.service';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as fs from 'fs';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}

  @Get()
  async findAll() {
    const baseUrl = 'https://www.xgmn02.com';
    const next = '下一页';
    let index = 0;
    const urls: string[] = [];

    const getCosplayImage = async () => {
      const res = await axios.get(
        `https://www.xgmn02.com/Cosplay/Cosplay10772${
          index !== 0 ? `_${index}` : ''
        }.html`,
      );
      console.log('打印***res,index', res, index);
      const $ = cheerio.load(res.data);
      // 找出分页的所有dom元素
      const pages = $('.article-content .pagination a')
        .map(function () {
          return $(this).text();
        })
        .toArray();
      if (pages.includes(next)) {
        $('.article-content p img').each(function () {
          console.log($(this).attr('src'));
          urls.push(baseUrl + $(this).attr('src'));
        });
        index++;
        await getCosplayImage();
      }
    };
    await getCosplayImage();
    console.log(urls);
    this.saveImages(urls);

    return this.spiderService.findAll();
  }

  saveImages(urls: string[]) {
    urls.forEach(async (url) => {
      console.log(
        '打印*** path.join',
        path.join(__dirname, '../images' + new Date().getTime() + '.jpg'),
      );
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data);
      const ws = fs.createWriteStream(
        path.join(__dirname, '../images/' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }

  writeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data);
      const ws = fs.createWriteStream(
        path.join(__dirname, '../cos' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }
}
