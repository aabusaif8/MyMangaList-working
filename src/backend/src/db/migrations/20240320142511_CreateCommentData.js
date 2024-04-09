exports.up = function(knex) {
    return knex.schema.createTable('comments', function(table) {
      table.increments('comment_id').primary();
      table.string("rating").notNull()
      table.text("review")
      table.string('reviewer_name')
      table.integer('manga_id').unsigned()
      table.foreign('manga_id').references('manga_id').inTable('manga')
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("comments");
  };