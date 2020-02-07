const Telegraf = require('telegraf');
const request = require('request');
const schedule = require('node-schedule');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
const hour = process.env.HOUR_TO_SEND;
const minute = process.env.MINUTE_TO_SEND;
bot.hears('курс', (ctx) => {
  schedule.scheduleJob({hour: hour, minute: minute}, function() {
    request('https://www.cbr-xml-daily.ru/daily_json.js', (error, response, body) => {
      if (error) throw new Error(Error);
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        ctx.telegram.sendMessage(process.env.CHANNEL_ID,
            `Курс валют относительно к рублю на данный момент:
  Доллар: ${data.Valute.USD.Value},
  Евро: ${data.Valute.EUR.Value},
  Фунт стерлингов: ${data.Valute.GBP.Value},
  Юань: ${data.Valute.CNY.Value}.
  `);
        ctx.reply('Курс валют уже на канале!');
      }
    });
  });
  ctx.reply(
      `Сообщение с курсом валют будет отправлено в ${hour}:${minute}`,
  );
});
bot.launch();
