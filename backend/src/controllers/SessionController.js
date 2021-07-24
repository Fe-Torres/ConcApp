const connection = require('../database/connection');

module.exports = {
	//Efetua o login
	async login(request, response){
		const { mail,pwd } = request.body;

		const user = await connection('user')
      .where({'mail': mail,
              'pwd': pwd})
			.select('id_user','name','born','sex','mail','tel','conc_types')
			.first();

			if(!user){
				return response.status(400).json({
					error: 'Usuário não foi encontrado'
				});
			}
				//retornar o dado da user caso encontre o usuário no banco
				return response.json(user);
			}
};