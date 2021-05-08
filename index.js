import fs from "fs";
import { format } from "date-fns";
import Discord from "discord.js";
import https from "https";
const client = new Discord.Client();
import "dotenv/config";
var day = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var date = format(new Date(`${day},${month},${year}`), "MM-dd-yyyy");
console.log(date);
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

  try {
    https.get(url, (res) => {
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const data = JSON.parse(rawData);
          fs.writeFile("output.txt", JSON.stringify(data), (e) =>
            console.log(e)
          );
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
        } catch (e) {
          console.error(e.message);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }

  client.on("message", async (message) => {
    if (message.content === "-inner") {
      message.reply("inner");
    }
  });

  await sleep(3600000);
};

fetch();
