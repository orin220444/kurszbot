const Telegraf = require('telegraf');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
const axios = require('axios');
const cron = require('node-cron');
const hour = process.env.HOUR_TO_SEND;
const minute = process.env.MINUTE_TO_SEND;
bot.hears('курс', async (ctx) => {
  cron.schedule(`* ${minute} ${hour} * *`, async () => {
    await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(async function(response) {
          ctx.reply(response.data.Valute.EUR);
          const data = response.data;
          ctx.reply(data.Valute.EUR);
          await ctx.telegram.sendMessage(process.env.CHANNEL_ID,
              `Курс валют относительно к рублю на данный момент:
  Доллар: ${data.Valute.USD.Value},
  Евро: ${data.Valute.EUR.Value},
  Фунт стерлингов: ${data.Valute.GBP.Value},
  Юань: ${data.Valute.CNY.Value}.
`);
          ctx.reply(`Курс валют уже на канале!`);
        });
  });
  ctx.reply(
      `Сообщение с курсом валют будет отправлено в ${hour}:${minute}`,
  );
})
    .catch(function(error) {
      console.log(error);
    });


bot.launch().then(function() {
  console.log('bot started');
});
