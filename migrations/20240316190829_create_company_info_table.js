/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("company_info", (table) => {
    table.increments("id").primary();
    table
      .integer("application_id")
      .unsigned()
      .references("applications.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("company_name").notNullable();
    table.string("company_address").notNullable();
    table.string("company_location").notNullable();
    table.string("company_about").notNullable;
    table.string("reference_name").notNullable();
    table.string("reference_contact").notNullable();
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
  return knex.schema.dropTable("company_info");
};
