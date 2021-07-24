exports.up = function(knex) {
	return knex.schema.createTable('posts', function(table){
    table.increments('id_posts');
    table.timestamps();

    table.string('post').notNullable();
    table.string('name_user').notNullable();
    table.string('mail').notNullable();
    table.string('fk_id_user').notNullable();
    
    table.foreign('fk_id_user').references('id_user').inTable('user');
	});
  
};

exports.down = function(knex) {
 return knex.schema.dropTable('posts');
};
