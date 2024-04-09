const data = require("./mangaData")
exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE manga RESTART IDENTITY CASCADE")
    .then(() => knex("manga").insert(data));
};

