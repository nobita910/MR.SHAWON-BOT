module.exports = {
  config:{
    name: "insta",
    version: "0.0.2",
    permission: 0,
    prefix: true,
    credits: "Shawon",
    description: "fb video",
    category: "user",
    usages: "",
    cooldowns: 5,
},

  languages: {
    "vi": {},
        "en": {
            "missing": '[ ! ] আপনি যে ভিডিও ডাইনলোড করতে চান তার লিংক দিন 🌸✨.',
            "wait": '𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 𝐕𝐈𝐃𝐄𝐎 𝐅𝐎𝐑 𝐘𝐎𝐔\n\n𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝟖...',
          "down": '✅ 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙎𝙐𝘾𝘾𝙀𝙎𝙎 ✨⬇️',
          "error": '❌Error'
        }
    },

start: async function({ nayan, events, args, lang }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
  const { ytdown, ndown, tikdown, twitterdown } = require("nayan-media-downloader")
    const { messageID, threadID } = events;
  if (!args[0]) return nayan.reply(lang("missing"), threadID, messageID);


    let np = args.join(" ");
   if (!args[1]) nayan.reply(lang("wait"), events.threadID, (err, info) => setTimeout(() => { nayan.unsendMessage(info.messageID) }, 20000));

 try {
    const res = await ndown(`${np}`);
console.log(res)
    var msg = [];
    let img1 = `${res.data[0].url}`;


    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/insta.mp4", Buffer.from(imgs1, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/insta.mp4"));

    {
        msg += lang("down")
    }

    return nayan.reply({
        body: msg,
        attachment: allimage
    }, events.threadID, events.messageID);
} catch (err) {
    nayan.reply(lang("error"), events.threadID, events.messageID);  
   }
}
};
