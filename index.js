import axios from "axios";
import { format } from "date-fns";
import Discord from "discord.js";
const client = new Discord.Client();
import "dotenv/config";
var day = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var date = format(new Date(`${day},${month},${year}`), "MM-dd-yyyy");
const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=731204&date=${date}`;

const hook = new Discord.WebhookClient(
  "840148969623257099",
  "vSd95qBLzF-7l44qq1E7S_6GtgbzVVBM8hR6y1BM0vGu0unTfwmrcng2URRiHEkfcUbO"
);
client.login(process.env.BOT_TOKEN);
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const fetch = async () => {
  while (true) {
    const { data } = await axios.get(url, {
      "access-control-allow-credentials": true,
    });
    data.centers.forEach((center) => {
      center.sessions.forEach((session) => {
        if (session.available_capacity != 0) {
          client.on("ready", () => {
            console.log(`Logged in as ${client.user.tag}!`);
          });
          hook.send(center.name);
        }
      });
    });
    await sleep(10800000);
  }
};

fetch();
