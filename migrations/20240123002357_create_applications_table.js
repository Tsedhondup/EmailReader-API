/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("applications", (table) => {
    table.increments("id").primary();
    table
      .integer("profile_id")
      .unsigned()
      .references("profiles.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("company_name").notNullable();
    table.string("company_email").notNullable();
    table.string("date_applied").notNullable();
    table.string("position").notNullable();
    table.string("status").notNullable();
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
  return knex.schema.dropTable("applications");
};
