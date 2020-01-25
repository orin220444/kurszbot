const Telegraf = require('telegraf');
const request = require('request');
const schedule = require('node-schedule');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.hears('курс', (ctx) => {
  schedule.scheduleJob({hour: process.env.TIME_TO_SEND}, function() {
    request('https://www.cbr-xml-daily.ru/daily_json.js', (error, response, body) => {
      if (error) throw new Error(Error);
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        ctx.reply(`Курс валют относительно к рублю на данный момент:
    Доллар: ${data.Valute.USD.Value} ,
    Евро: ${data.Valute.EUR.Value},
    Фунт стерлингов: ${data.Valute.GBP.Value},
    Юань: ${data.Valute.CNY.Value}.
    `);
      }
    });
  });
});
bot.launch();
