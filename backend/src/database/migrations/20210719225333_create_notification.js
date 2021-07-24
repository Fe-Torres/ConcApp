exports.up = function(knex) {
	return knex.schema.createTable('notification', function(table){
    table.increments('id_notification');
    table.timestamps();
    
    table.string('type_notification').notNullable();
    table.string('message_notification').notNullable();
    table.string('id_follow_or_message').notNullable();
    table.string('status').notNullable();
    table.string('fk_id_user').notNullable();
    
    table.foreign('fk_id_user').references('id_user').inTable('user');
	});
  
};

exports.down = function(knex) {
 return knex.schema.dropTable('notification');
};
