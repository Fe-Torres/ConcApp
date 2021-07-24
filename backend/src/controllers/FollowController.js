const connection = require('../database/connection');
const user_utils = require('../utils/user_utills');

module.exports = {
  async create(request, response){
    const fk_id_user = request.headers.authorization;
    const name = request.headers.name;
    const type_notification = 'Novo seguidor(a)';
    const message_notification = `O usuário ${name} começou a te seguir!`;

    const {id_following} = request.body;  

    user_exists = await user_utils.user_exists(fk_id_user);

    if( user_exists == false){
      return response.status(400).json({error: 'Conta não reconhecida'})
    }

    const follow_exists = await connection('follow')
    .where({'fk_id_user': fk_id_user,
          'id_following': id_following})
    .select('*')
    .first();

    if(follow_exists){
      return response.status(400).json({error: 'Você já está seguindo esse usuário'})
    }
    await connection('follow').insert({
      fk_id_user,
      id_following
    });
    //função que cria a notificação
    await user_utils.creat_notification(type_notification,message_notification,fk_id_user,id_following);
  
    return response.status(204).send();
  },

  //Para deixar de sguir um usuário
  async delete(request, response){
  const fk_id_user = request.headers.authorization;
  const {id_following} = request.body;  
  
  user_exists = await user_utils.user_exists(fk_id_user);
  
  if( user_exists == false){
    return response.status(400).json({error: 'Conta não reconhecida'})
  }

  const follow_exists = await connection('follow')
  .where({'fk_id_user': fk_id_user,
        'id_following': id_following})
  .select('*')
  .first();

  if(!follow_exists){
    return response.status(400).json({error: 'Você não está seguindo o usuário'})
  }

  await connection('follow')
  .where({'fk_id_user': fk_id_user,'id_following': id_following})
  .delete();
  return response.status(200).json({error: 'Você deixou de seguir este usuário'})
  },
  async following_users(request, response) {
    const fk_id_user = request.headers.authorization;
    const following_users = await user_utils.following(fk_id_user);

    return response.json({'Seguindo':following_users[0]});
  },
  async followeres_users(request, response) {
    const fk_id_user = request.headers.authorization;
    const followeres_users = await user_utils.followeres(fk_id_user);

    return response.json({'Seguidores':followeres_users});
  }
};