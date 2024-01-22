/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("profile", (table) => {
      table.increments("id").primary();
      table.string("full_name").notNullable();
      table.string("email").notNullable();
      table.string("phone_number").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("companies", (table) => {
      table.increments("company_id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("profile.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("company_name").notNullable();
      table.string("date_applied").notNullable();
      table.string("postion").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("emails", (table) => {
      table.increments("email_id").primary();
      table
        .integer("id_of_company")
        .unsigned()
        .references("companies.company_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("date").notNullable();
      table.string("email_body").notNullable();
      table.string("subject").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("interviews", (table) => {
      table.increments("interview_id").primary();
      table
        .integer("id_of_company")
        .unsigned()
        .references("companies.company_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("company_name").notNullable();
      table.string("date").notNullable();
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
  return knex.schema
    .dropTable("interviews")
    .dropTable("emails")
    .dropTable("companies")
    .dropTable("profile");
};
