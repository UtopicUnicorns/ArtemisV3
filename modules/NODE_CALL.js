////////////////////////////////////
//Node modules collection
//Easy to modify
////////////////////////////////////
exports.nodes = async function () {
  db = require("better-sqlite3")("./modules/DATABASE.sqlite");
  fs = require("fs");
  path = require("path");
  Discord = require("discord.js");
  browser = require("browser");
  moment = require("moment");
  html = require("html-to-text");
  colour = require("./TERM_COLOURS");
  DATABASEINI = require("./DATABASE");
  TwitchEmitter = require("events");
  class Emitter extends TwitchEmitter {}
  twitchEmitter = new Emitter();
  Twitch = require("./twitchModule.js");
  request = require("request");
  cleverbot = require("cleverbot-free");
  adminEvent = require("./ADMINISTRATIVE_EVENT");
  term_clock = `\n${colour.cyan}${moment().format("MMMM Do YYYY, HH:mm:ss")}\n`;
  express = require("express");
  app = express();
  http = require("http");
  https = require("https");
  bodyParser = require("body-parser");
  ejs = require("ejs");
  youtubedl = require("youtube-dl");
  PLAYER = require("./PLAYER");
  search = require("youtube-search");
  //NEED OPUS, FFMPEG, YOUTUBE-DL TOO

  ////////////////////////////////////
  //Initiating the databases
  //All databases will be created or checked
  ////////////////////////////////////
  await DATABASEINI.DATABASE(db);

  ////////////////////////////////////
  //Loading/hotplugging all
  //databases for easy calling
  ////////////////////////////////////
  getScore = await db.prepare(
    "SELECT * FROM scores WHERE user = ? AND guild = ?"
  );
  setScore = await db.prepare(
    "INSERT OR REPLACE INTO scores (id, user, guild, points, level, warning, muted, permit, bonus) VALUES (@id, @user, @guild, @points, @level, @warning, @muted, @permit, @bonus);"
  );

  getUsage = await db.prepare("SELECT * FROM usage WHERE command = ?");
  setUsage = await db.prepare(
    "INSERT OR REPLACE INTO usage (command, number) VALUES (@command, @number);"
  );

  getRoles = await db.prepare(
    "SELECT * FROM roles WHERE guild = ? AND emoji = ?"
  );
  setRoles = await db.prepare(
    "INSERT OR REPLACE INTO roles (guild, roles, emoji) VALUES (@guild, @roles, @emoji);"
  ); //

  getGuild = await db.prepare("SELECT * FROM guildhub WHERE guild = ?");
  setGuild = await db.prepare(
    "INSERT OR REPLACE INTO guildhub (guild, generalChannel, highlightChannel, muteChannel, logsChannel, streamChannel, reactionChannel, verificationChannel, supportChannel, supportInUseChannel) VALUES (@guild, @generalChannel, @highlightChannel, @muteChannel, @logsChannel, @streamChannel, @reactionChannel, @verificationChannel, @supportChannel, @supportInUseChannel);"
  );

  getUserInfo = await db.prepare("SELECT * FROM userinfo WHERE id = ?");
  setUserInfo = await db.prepare(
    "INSERT OR REPLACE INTO userinfo (id, username, nickname, specs, totalwarnings, totalmutes) VALUES (@id, @username, @nickname, @specs, @totalwarnings, @totalmutes);"
  );

  getSettings = await db.prepare("SELECT * FROM settings WHERE guildid = ?");
  setSettings = await db.prepare(
    "INSERT OR REPLACE INTO settings (guildid, streamHere, autoMod, prefix, leveling, wmessage, defaultrole, bonuspoints, artemisTalks, wimage) VALUES (@guildid, @streamHere, @autoMod, @prefix, @leveling, @wmessage, @defaultrole, @bonuspoints, @artemisTalks, @wimage);"
  );

  getLogs = await db.prepare("SELECT * FROM logs WHERE guildid = ?");
  setLogs = await db.prepare(
    "INSERT OR REPLACE INTO logs (guildid, msgupdate, msgdelete, chancreate, chandelete, chanupdate, reactadd, reactdelete, invcreate, invdelete, grolecreate, groledelete, groleupdate, gmemadd, gmemupdate, gmemdelete, gbanadd, gbanremove, voiceupdate) VALUES (@guildid, @msgupdate, @msgdelete, @chancreate, @chandelete, @chanupdate, @reactadd, @reactdelete, @invcreate, @invdelete, @grolecreate, @groledelete, @groleupdate, @gmemadd, @gmemupdate, @gmemdelete, @gbanadd, @gbanremove, @voiceupdate);"
  );

  getPrivacy = await db.prepare("SELECT * FROM privacyisajoke WHERE msgid = ?");
  setPrivacy = await db.prepare(
    "INSERT OR REPLACE INTO privacyisajoke (msgid, userid, content, username) VALUES (@msgid, @userid, @content, @username);"
  );

  getStream = await db.prepare(
    "SELECT * FROM streamers WHERE streamerguild = ?"
  );
  setStream = await db.prepare(
    "INSERT OR REPLACE INTO streamers (streamerguild, streamer, guild, status) VALUES (@streamerguild, @streamer, @guild, @status);"
  );

  getACase = await db.prepare(
    'SELECT * FROM admincases WHERE guildid = ? ORDER BY "caseid" DESC'
  );
  setACase = await db.prepare(
    "INSERT OR REPLACE INTO admincases (guildidcaseid, caseid, guildid, userid, username, type, reason, date, judge) VALUES (@guildidcaseid, @caseid, @guildid, @userid, @username, @type, @reason, @date, @judge);"
  );

  getAdminTimer = await db.prepare("SELECT * FROM admintimers");
  setAdminTimer = await db.prepare(
    "INSERT OR REPLACE INTO admintimers (GuildUserTime, guildid, userid, type, time) VALUES (@GuildUserTime, @guildid, @userid, @type, @time);"
  );

  getLevelUp = await db.prepare("SELECT * FROM levelup WHERE guildid = ?");
  setLevelUp = await db.prepare(
    "INSERT OR REPLACE INTO levelup (GuildAndLevel, guildid, level, role) VALUES (@GuildAndLevel, @guildid, @level, @role);"
  );

  getRemindTimer = await db.prepare(
    "SELECT * FROM remindtimers WHERE GuildUserTime = ?"
  );
  setRemindTimer = await db.prepare(
    "INSERT OR REPLACE INTO remindtimers (GuildUserTime, reason, channel) VALUES (@GuildUserTime, @reason, @channel);"
  );

  getBumpRecord = await db.prepare(
    "SELECT * FROM bumprecord WHERE user = ? AND guild = ?"
  );
  setBumpRecord = await db.prepare(
    "INSERT OR REPLACE INTO bumprecord (GuildUser, user, guild, bump, dbump, dlmbump, like, dotbump) VALUES (@GuildUser, @user, @guild, @bump, @dbump, @dlmbump, @like, @dotbump);"
  );

  getSupportChannels = await db.prepare(
    "SELECT * FROM supportchannels WHERE chanid = ?"
  );
  setSupportChannels = await db.prepare(
    "INSERT OR REPLACE INTO supportchannels (chanid, inuse) VALUES (@chanid, @inuse);"
  );

  getSCase = await db.prepare(
    'SELECT * FROM supportcases WHERE caseid = ? ORDER BY "caseid" DESC'
  );
  setSCase = await db.prepare(
    "INSERT OR REPLACE INTO supportcases (caseid, userid, username, attachments, casemessage, date, solvedby, solution) VALUES (@caseid, @userid, @username, @attachments, @casemessage, @date, @solvedby, @solution);"
  );

  getSupportInUseChannels = await db.prepare(
    "SELECT * FROM supportinusechannels WHERE chanid = ?"
  );
  setSupportInUseChannels = await db.prepare(
    "INSERT OR REPLACE INTO supportinusechannels (chanid, caseid) VALUES (@chanid, @caseid);"
  );

  getHighlight = await db.prepare("SELECT * FROM hlmsg WHERE msgid = ?");
  setHighlight = await db.prepare(
    "INSERT OR REPLACE INTO hlmsg (msgid) VALUES (@msgid);"
  );

  getTopic = await db.prepare("SELECT * FROM topic WHERE gldid = ?");
  setTopic = await db.prepare(
    "INSERT OR REPLACE INTO topic (gldidtime, gldid, topictext) VALUES (@gldidtime, @gldid, @topictext);"
  );

  getBW = await db.prepare("SELECT * FROM badword WHERE gldid = ?");
  setBW = await db.prepare(
    "INSERT OR REPLACE INTO badword (gldidtime, gldid, badwords) VALUES (@gldidtime, @gldid, @badwords);"
  );

  getBP = await db.prepare("SELECT * FROM badphrase WHERE gldid = ?");
  setBP = await db.prepare(
    "INSERT OR REPLACE INTO badphrase (gldidtime, gldid, badphrases) VALUES (@gldidtime, @gldid, @badphrases);"
  );

  getCC = await db.prepare("SELECT * FROM cc WHERE gldid = ?");
  setCC = await db.prepare(
    "INSERT OR REPLACE INTO cc (gldidtime, gldid, ccname, cclocation, ccaction) VALUES (@gldidtime, @gldid, @ccname, @cclocation, @ccaction);"
  );
};
