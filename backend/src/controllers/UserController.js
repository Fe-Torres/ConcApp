const connection = require('../database/connection');
const crypto = require('crypto');
const user_utils = require('../utils/user_utills');

// exportar os objetos com os métodos
module.exports = {
  // método para criar o usuário
  async create(request, response){
    const {name,born,sex,mail,pwd,tel,conc_types} = request.body;
    const id_user = crypto.randomBytes(4).toString('HEX');
  
  // confere se o e-mail já existe
  const mail_exists = await connection('user')
    .where('mail', mail)
    .select('*')
    .first();

  if(mail_exists){
    return response.status(400).json({error: 'O e-mail já está sendo usado!'})
  }

  await connection('user').insert({
    id_user,
    name,
    born,
    sex,
    mail,
    pwd,
    tel,
    conc_types
  });
  
  return response.json({id_user});
  },
  //perfil do usuário
  async index (request, response)  {
    const id_user = request.headers.authorization;

    const user_data = await connection('user')
        .where('id_user',id_user)
        .select([
        'name',
        'mail',
        'tel',
        'conc_types',
        'sex'
        ]);

		return response.json(user_data);
  },
  
  async allusers(request, response) {
    const fk_id_user = request.headers.authorization;
    
    const following_users = await user_utils.following(fk_id_user);
    
    //para não trazer os dados dele na exibição de todos os usuário
    following_users[1].push(fk_id_user);
    //Usuários que o usuário da conta não está seguindo
    const notfollowing = await connection('user')
        .whereNotIn('id_user', following_users[1])
        .select([
        'id_user',
        'name',
        'mail',
        'tel',
        'conc_types'
        ])

    return response.json({
      'Usuários seguindo':following_users[0],
      'Usuários que não estou seguindo': notfollowing
    })
  },
  
}