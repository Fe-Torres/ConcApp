const connection = require('../database/connection');

module.exports = {
  //visualiza todas as notificações do usuário
  async index(request, response){
		const fk_id_user = request.headers.authorization;
    
    const noview_all_notification = await connection('notification')
    .where({
      'fk_id_user': fk_id_user,
      'status': 'Não lida'})
    .select('*')
    
    const view_all_notification = await connection('notification')
    .where({
      'fk_id_user': fk_id_user,
      'status': 'Lida'})
    .select('*')

    return response.json({
      'Não visualizadas': noview_all_notification,
      'Visualizadas': view_all_notification});
  },
  //Visualiza apenas uma notificação
  async index_single(request, response){
		const fk_id_user = request.headers.authorization;
    const {id_notification} = request.body;

    const notification = await connection('notification')
    .where({
      'fk_id_user': fk_id_user,
      'id_notification':id_notification})
    .select('*')
  
    return response.json(notification);
  },
  //altera o status de todas as noticações para "Vista"
  async viewall_notification(request, response){
		const fk_id_user = request.headers.authorization;
    
    await connection('notification')
    .where({
      'fk_id_user': fk_id_user,
      'status':'Não lida'})
    .update('status','Lida')

	return response.status(200).json();
  },
  //altera o status de apenas uma notificação para "Vista"
  async viewsingle_notification(request, response){
    const fk_id_user = request.headers.authorization;
    const {id_notification} = request.body;

   await connection('notification')
    .where({
      'fk_id_user': fk_id_user,
      'id_notification':id_notification})
    .update('status','Lida')

    return response.status(200).json();
},
  //Apaga uma notificação
  async deletesingle_notification(request, response){
    const fk_id_user = request.headers.authorization;
    const {id_notification} = request.body;

    await connection('notification')
    .where({
      'fk_id_user': fk_id_user,
      'id_notification':id_notification})
    .delete()

    return response.status(200).json();
  },
  //Apaga todas notificações
  async deleteall_notification(request, response){
    const fk_id_user = request.headers.authorization;
    
    await connection('notification')
    .where('fk_id_user', fk_id_user)
    .delete()

	return response.status(200).json();
  }
}