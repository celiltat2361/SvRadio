const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllPrograms = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs?${json}&${paginationFalse}`
  );
  programs = await programs.json();
  res.json(programs);
};

const getProgramById = async ( req, res) => {
  let program = await fetch(
    `https://api.sr.se/api/v2/programs/${req.params.programId}?${json}`
  );
  program = await program.json();
  res.json(program);
};

const getProgramSchedule = async (req, res) => {
  let programSchedule = await fetch(`http://api.sr.se/api/v2/episodes/index?programid=${req.params.programId}&${json}&${paginationFalse}`);
  programSchedule = await programSchedule.json();
  res.json(programSchedule.episodes);
};

module.exports = {
  getAllPrograms,
  getProgramById,
  getProgramSchedule
  
};
