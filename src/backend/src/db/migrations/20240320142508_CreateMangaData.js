exports.up = function (knex) {
    return knex.schema.createTable("manga", (table) => {
      table.increments("manga_id").primary();
      table.string("manga_name");
      table.string("mangaka_name");
      table.string("rating");
      table.text("description");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("manga");
  };