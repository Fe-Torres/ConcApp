exports.up = function(knex) {
	return knex.schema.createTable('message', function(table){
    table.increments('id_message');
    table.timestamps();
    
    table.string('message').notNullable();
    table.string('name_sent').notNullable();
    table.string('fk_id_usersent').notNullable();
    table.string('fk_id_recipient').notNullable();
        

    table.foreign('fk_id_usersent').references('id_user').inTable('user');
	});
  
};

exports.down = function(knex) {
 return knex.schema.dropTable('like_posts');
};
