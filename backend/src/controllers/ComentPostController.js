const connection = require('../database/connection');
const user_utils = require('../utils/user_utills');

module.exports = {
  //criação do comentário
  async create(request, response){
    const fk_id_user = request.headers.authorization;
    const user_name = request.headers.name;  

    const {fk_id_posts,coment} = request.body;
  
    await connection('coment_posts').insert({
      'user_name':user_name,
      'coment':coment,
      'fk_id_user': fk_id_user,
      'fk_id_posts': fk_id_posts
    });
    
    return response.status(200).json({message: 'Comentário publicado'})
  },
  //visualização de apenas um comentário
  async single_coment (request, response) {
    let my_coment = false;

    const fk_id_user = request.headers.authorization;
    const {id,id_posts} = request.body;

    const [coment] = await connection('coment_posts')
        .where('id', id)
        .select('*')
    
    if(!coment){
    return response.status(400).json({message: 'Erro encontrado ao buscar o comentário'})
    } else if (coment.fk_id_user == fk_id_user) {
      my_coment = true;
    }
  return response.json({
    'Coment':coment,
    'My_coment':my_coment});
  },
    //
    async delete_coment(request, response){
      const fk_id_user = request.headers.authorization;
      const {id} = request.body;   
        
    
      const result = await connection('coment_posts')
      .where({'fk_id_user': fk_id_user,
              'id': id})
      .delete();
     
      if (result == 1) {
        return response.status(200).json({message: 'Você excluiu esse comentário!'})
      }

      return response.status(400).json({error: 'Problemas encotnrados em excluir esse comentário!'})
      },

      async update_coment(request, response){
        const fk_id_user = request.headers.authorization;
        const {id,coment} = request.body;   
      
        const result = await connection('coment_posts')
        .where({'fk_id_user': fk_id_user,
                'id': id})
        .update({
          'coment':coment
        }); 
        if (result == 1) {
          return response.status(200).json({message: 'Você alterou esse comentário!'})
        }
        return response.status(400).json({error: 'Problema encontrado ao alterar o comentário!'})
        },

    
};