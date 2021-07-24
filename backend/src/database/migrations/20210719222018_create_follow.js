exports.up = function(knex) {
	return knex.schema.createTable('follow', function(table){
		table.increments('id_follow');
    table.timestamps();

    table.string('fk_id_user').notNullable();
    table.string('id_following').notNullable();

    table.foreign('fk_id_user').references('id_user').inTable('user');
	});
  
};

exports.down = function(knex) {
 return knex.schema.dropTable('follow');
};
