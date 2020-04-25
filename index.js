const Telegraf = require('telegraf');
const axios = require('axios');
const schedule = require('node-schedule');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
const hour = process.env.HOUR_TO_SEND;
const minute = process.env.MINUTE_TO_SEND;
bot.hears('курс', (ctx) => {
  schedule.scheduleJob({hour: hour, minute: minute}, function() {
    axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(function(response){
        let data = response.data.Valute
        ctx.telegram.sendMessage(process.env.CHANNEL_ID,
            `Курс валют относительно к рублю на данный момент:
  Доллар: ${data.USD.Value},
  Евро: ${data.EUR.Value},
  Фунт стерлингов: ${data.GBP.Value},
  Юань: ${data.CNY.Value}.
  `);
        ctx.reply('Курс валют уже на канале!');
        
      })
    });

  ctx.reply(
      `Сообщение с курсом валют будет отправлено в ${hour}:${minute}`,
  );
});
bot.launch();
