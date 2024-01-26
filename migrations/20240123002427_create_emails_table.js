/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("emails", (table) => {
    table.increments("id").primary();
    table
      .integer("id_of_company")
      .unsigned()
      .references("companies.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("date").notNullable();
    table.string("email_body").notNullable();
    table.string("subject").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("emails");
};
