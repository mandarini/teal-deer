import { Bot, Api } from "grammy";
import * as dotenv from "dotenv";
dotenv.config();

const bot = new Bot(process.env?.["BOT_API_KEY"] ?? "");

async function sendHelloToYourChannel() {
  await bot.api.sendMessage(
    process.env?.["BOT_MY_CHANNEL_ID"] ?? "",
    "Hello there!"
  );

  const api = new Api(process.env?.["BOT_API_KEY"] ?? "");

  api.getUpdates().then((updates) => console.log(updates));
  api
    .getChat(process.env?.["BOT_MY_CHANNEL_ID"] ?? "")
    .then((chat) => console.log(chat));
}

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", (ctx) => {
  sendHelloToYourChannel();
  console.log(ctx);
  console.log(ctx.message.chat);
  return ctx.reply("Got another message!");
});

bot.start();
