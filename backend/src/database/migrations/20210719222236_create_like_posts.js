exports.up = function(knex) {
	return knex.schema.createTable('like_posts', function(table){
    table.increments('id_like_posts');

    table.string('fk_id_user').notNullable();
    table.integer('fk_id_posts').notNullable();

    table.foreign('fk_id_posts').references('id_posts').inTable('posts');
    table.foreign('fk_id_user').references('id_user').inTable('user');
	});
  
};

exports.down = function(knex) {
 return knex.schema.dropTable('like_posts');
};
