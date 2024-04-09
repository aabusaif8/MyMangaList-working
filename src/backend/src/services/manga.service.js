const knex = require("../db/connection");

function list() {
  return knex("manga")
    .select("*")
    .orderBy('manga_id'); // Correct usage of orderBy with column name
}
function listComments(manga_id) {
  return knex("comments").select("*").where("manga_id", manga_id);
}
function read(manga_id) {
  return knex("manga").select("*").where({ manga_id }).first();
}

async function createComment(comment) {
  const bindings = [
    comment.rating,
    comment.review,
    comment.reviewer_name,
    comment.manga_id
  ];

  try {
    const result = await knex('comments').insert({
      comment_id: Math.floor((new Date().getTime())/1000),
      rating: bindings[0],
      review: bindings[1],
      reviewer_name: bindings[2],
      manga_id: bindings[3]
    }).returning('*');

    console.log('Inserted data:', result);
    return result; // Add a return statement to return the inserted data
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error; // Optionally, you can throw the error for better error handling
  }
}

module.exports = {
  list,
  read,
  listComments,
  createComment
};