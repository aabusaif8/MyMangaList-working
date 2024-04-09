const data = require("./commentData.json")
exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE comments RESTART IDENTITY CASCADE")
    .then(() => knex("comments").insert(data));
};

