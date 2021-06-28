const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const utils = require("../core/utilities");

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  channels = await channels.json();
  res.json(channels);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
  channel = await channel.json();
  res.json(channel);
};

const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}`
  );
  channelSchedule = await channelSchedule.json();
  channelSchedule.schedule = channelSchedule.schedule.map((obj) => {
    return {
        ...obj,
        starttimeutc: utils.convertToDateObject(obj.starttimeutc),
        endtimeutc: utils.convertToDateObject(obj.endtimeutc),
    };
  });
  res.json(channelSchedule.schedule);
};

const getProgramsByChannel = async (req, res) => {
  let programs = await fetch(`http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${paginationFalse}`);
  programs = await programs.json();
  res.json(programs.programs);
}

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
  getProgramsByChannel
};
