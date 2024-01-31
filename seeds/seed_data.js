/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// import seed data
const profiles = require("../seed_data/profile");
const applications = require("../seed_data/applications");
const emails = require("../seed_data/emails");
const interviews = require("../seed_data/interviews");

// exports.seed = async function (knex) {
//   // Deletes ALL existing entries
//   await knex("table_name").del();
//   await knex("table_name").insert([
//     { id: 1, colName: "rowValue1" },
//     { id: 2, colName: "rowValue2" },
//     { id: 3, colName: "rowValue3" },
//   ]);
// };

exports.seed = function (knex) {
  return knex("interviews") // delete inteviews table
    .del()
    .then(() => {
      return knex("emails") // delete emails table
        .del();
    })
    .then(() => {
      return knex("applications") // delete emails table
        .del();
    })
    .then(() => {
      return knex("profiles") // delete emails table
        .del();
    })
    .then(function () {
      return knex("profiles").insert(profiles);
    })
    .then(() => {
      return knex("applications").insert(companies);
    })
    .then(() => {
      return knex("emails").insert(emails);
    })
    .then(() => {
      return knex("interviews").insert(interviews);
    });
};
