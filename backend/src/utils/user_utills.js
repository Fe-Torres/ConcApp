const connection = require('../database/connection');

module.exports = {
  //Verifica a existência do ID do usuário
  async user_exists(id_user){
    var user_exis = true;

    const user = await connection('user')
      .where({'id_user': id_user})
      .select()
      .first();
  
			if(!user){
        user_exis = false;
				return user_exis;
			}
				return user_exis;
      },

      async following(id_user){
        let following_ids = [];

        //Pegando os Ids dos usuários que o user principal está seguindo
        const id_following = await connection('user') //Join para trazer todas as pessoas que o usuário está seguindo
        .where({'id_user': id_user})
        .join('follow', 'follow.fk_id_user', '=', 'user.id_user')//relacionar dados de duas tabelas
        .select('follow.id_following');
        
        //transformando em vetor para filtrar no whereIn
        for (let i = 0; i < id_following.length; i++) {
          const element = id_following[i];
          following_ids.push(element.id_following)
        }
        
        //buscando os dados dos "seguindo" do usuário
        const following = await connection('user')
        .whereIn('id_user', following_ids)
        .select([
        'id_user',
        'name',
        'mail',
        'tel',
        'conc_types'
        ])

      return [following,following_ids];
      },

      async followeres(id_user){
        let ids_followeres = [];

        const id_followeres = await connection('user') //Join para trazer todas as pessoas que o usuário está seguindo
        .where({'id_user': id_user})
        .join('follow', 'follow.id_following', '=', 'user.id_user')//relacionar dados de duas tabelas
        .select('follow.fk_id_user');
   
        
        //transformando em vetor para filtrar no whereIn
         for (let i = 0; i < id_followeres.length; i++) {
          const element = id_followeres[i];
          ids_followeres.push(element.fk_id_user)
        }

        //buscando os dados dos "seguidores" do usuário
        const followeres = await connection('user')
        .whereIn('id_user', ids_followeres)
        .select([
        'id_user',
        'name',
        'mail',
        'tel',
        'conc_types'
        ])

      return followeres;
      },
      //função usada para criar a notificação
      async creat_notification(type_notification,message_notification,id_follow_or_message,fk_id_user){
        const status = 'Não lida';

        await connection('notification').insert({
          type_notification,
          message_notification,
          id_follow_or_message,
          status,
          fk_id_user
        });

      return;
      }
}