exports.up = function(knex) {
	return knex.schema.createTable('user', function(table){
		table.string('id_user').primary();
		table.string('name').notNullable();
		table.date('born').notNullable();
		table.string('sex').notNullable();
		table.string('mail').notNullable();
    table.string('pwd').notNullable();
    table.string('tel').notNullable();
    table.string('conc_types').notNullable();
	});
  
};

exports.down = function(knex) {
 return knex.schema.dropTable('user');
};
