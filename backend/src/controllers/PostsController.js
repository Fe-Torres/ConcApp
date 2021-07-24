const connection = require('../database/connection');
const user_utils = require('../utils/user_utills');

module.exports = {
  
  async create(request, response){
    const fk_id_user = request.headers.authorization;
    const user_name = request.headers.name;  
    const mail = request.headers.mail;  

    const {post} = request.body;
  
    await connection('posts').insert({
      'name_user':user_name,
      'mail': mail,
      'post':post,
      'fk_id_user': fk_id_user
    });
    
    return response.status(200).json({message: 'Post publicado'})
  },

  async index_posts(request, response) {
    let following_idsposts = []
    const fk_id_user = request.headers.authorization;
    //Como ele irá ver apenas as postagens dos "seguindo" e as dele, irei buscar os ids dos usuários que ele segue
    const following_ids = await user_utils.following(fk_id_user);
    
    following_idsposts = following_ids[1];
    
    //adicionando o id dele no array dos ids dos "seguindo"
    following_idsposts.push(fk_id_user);

    //Filtrando os posts dele e dos "seguindo"
    const posts = await connection('posts')
        .whereIn('fk_id_user', following_idsposts)
        .select('*')

    return response.json({'Posts':posts});
  },
  //visualiza apenas um post
  async single_post (request, response) {
    let count_likes = 0;
    let my_post = false;
    const fk_id_user = request.headers.authorization;
    const {id_posts} = request.body;

    const [post] = await connection('posts')
        .where('id_posts', id_posts)
        .select('*')
    
    if(!post){
    return response.status(400).json({message: 'Erro encontrado ao buscar a publicação'})
    } else if (post.fk_id_user == fk_id_user) {
      my_post = true;
    }

  const [coment] = await connection('coment_posts')
  .where('fk_id_posts', id_posts)
  .select('*')

  const like = await connection('like_posts')
  .where('fk_id_posts', id_posts)
  .select('*')
  
  //conta quantos likes existem nesse post
  for (var i in like) {
    count_likes++;
  }

  return response.json({
    'Post':post,
    'My_post':my_post,
    'Coments':coment,
    'Likes':like,
    'N_likes': count_likes
  });
  },
  async like_post(request, response){
    const fk_id_user = request.headers.authorization;
    const {fk_id_posts} = request.body;  
    
    //confere se o usuário já deu o like no post
    const like_exists = await connection('like_posts')
    .where({'fk_id_user': fk_id_user,
          'fk_id_posts': fk_id_posts})
    .select('*')
    .first();
    
    //se ele tiver dado o like, então será retirado esse like
    if(like_exists){
      await connection('like_posts')
      .where({'fk_id_user': fk_id_user,
              'fk_id_posts': fk_id_posts})
      .delete();
      return response.status(200).json({message: 'Você descurtiu esse post'})
    }

    //se ele não tiver feito o like no post, ele será feito!
    await connection('like_posts').insert({
      fk_id_user,
      fk_id_posts
    });
    
    return response.status(200).json({message: 'Você curtiu esse post'});
    },
    //apaga o post
    async delete_post(request, response){
      const fk_id_user = request.headers.authorization;
      const {fk_id_posts} = request.body;   
    
      await connection('posts')
      .where({'fk_id_user': fk_id_user,
              'id_posts': fk_id_posts})
      .delete();

      return response.status(200).json({error: 'Você excluiu esse post!'})
      },

      async update_post(request, response){
        const fk_id_user = request.headers.authorization;
        const {fk_id_posts,post} = request.body;   
      
        await connection('posts')
        .where({'fk_id_user': fk_id_user,
                'id_posts': fk_id_posts})
        .update({
          'post':post
        });
  
        return response.status(200).json({error: 'Você alterou esse post!'})
        },

    
};