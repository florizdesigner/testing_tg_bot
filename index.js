const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "5822032611:AAFBU63FJPNoFxf5TdTzRHcgrzlTJ3T6yGw";
const webAppUrl = "https://gentle-zabaione-d86ed4.netlify.app";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const { id } = msg.chat;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(id, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        keyboard: [
          [{ text: "Заполнить форму", web_app: { url: webAppUrl + "/form" } }],
        ],
      },
    });

    await bot.sendMessage(id, "Заходи в интернет-магазин", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Сделать заказ", web_app: { url: webAppUrl + "/form" } }],
        ],
      },
    });
  }
});
