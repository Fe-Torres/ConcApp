exports.up = function(knex) {
	return knex.schema.createTable('coment_posts', function(table){
    table.increments();
    table.timestamps();

    table.string('coment').notNullable();
    table.string('user_name').notNullable();
    table.string('fk_id_user').notNullable();
    table.integer('fk_id_posts').notNullable();

    table.foreign('fk_id_posts').references('id_posts').inTable('posts'); 
    table.foreign('fk_id_user').references('id_user').inTable('user');
  });
  
};

exports.down = function(knex) {
 return knex.schema.dropTable('coment_posts');
};
