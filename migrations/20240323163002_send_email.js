/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sent_mail", (table) => {
    table.increments("id").primary();
    table
      .integer("application_id")
      .unsigned()
      .references("applications.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("from").notNullable();
    table.string("to").notNullable();
    table.string("reply_to").notNullable();
    table.string("subject").notNullable;
    table.string("email_date").notNullable();
    table.string("email_html_style").notNullable();
    table.string("email_html_style").notNullable();
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
  return knex.schema.dropTable("sent_mail");
};
