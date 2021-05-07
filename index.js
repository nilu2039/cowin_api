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
  "840176397515358248",
  "5LcsYolIa_gAu7dP2naMBWKhD9Lc3W3xASec2QyD5X5hZ_RfL8N9k0Ecj1M-15FG1IKf"
);
client.login(process.env.BOT_TOKEN);
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const fetch = async () => {
  client.on("message", async (message) => {
    if (message.content === "-outer") {
      message.reply("outer");
    }
  });
  while (true) {
    const { data } = await axios.get(url, {
      "access-control-allow-credentials": true,
    });
    client.on("message", async (message) => {
      if (message.content === "-inner") {
        message.reply("inner");
      }
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
