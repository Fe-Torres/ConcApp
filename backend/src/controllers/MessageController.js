const connection = require('../database/connection');
const user_utils = require('../utils/user_utills');

module.exports = {
  async create_message(request, response){
    const fk_id_usersent = request.headers.authorization;
    const name_sent = request.headers.name;
    const type_notification = 'Nova mensagem';
    const message_notification = `Você recebeu uma nova mensagem de ${name_sent}!`;
    const {message,fk_id_recipient} = request.body;  
    
    //função que verifica se o usuário existe
    const user_exist = await user_utils.user_exists(fk_id_usersent);

    if(!user_exist){
      return response.status(400).json({message: 'Erro encontrado ao enviar a mensagem'})
    }    
    
    const id_message = await connection('message').insert({
      message,
      name_sent,
      fk_id_usersent,
      fk_id_recipient
    });
    //Criando a notificação
    await user_utils.creat_notification(type_notification,message_notification, fk_id_usersent, fk_id_recipient);

  return response.status(200).json({message:'Mensagem enviada com sucesso'});
  },
  async single_message (request, response) {
    const fk_id_user = request.headers.authorization;
    const {id_message} = request.body;
    let my_message = false;

    const [message] = await connection('message')
        .where('id_message', id_message)
        .select('*')
    
    if(!message){
    return response.status(400).json({message: 'Erro encontrado ao buscar a mensagem'})
    } else if (message.fk_id_usersent == fk_id_user) {
      my_message = true;
    }

  if(message.fk_id_usersent != fk_id_user && message.fk_id_recipient != fk_id_user ){
    return response.status(400).json({message: 'Você não tem permissão para visualizar essa mensagem'})
  }

  return response.json({
    'Message':message,
    'my_message':my_message
  });
  },
};