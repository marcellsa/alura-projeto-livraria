import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next){
  try{
    let { limite = 3, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [ campoOrdenacao, ordem]  = ordenacao.split(":");
  
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;
  
    if (limite > 0 && pagina > 0){
      const resultadoPaginado = await resultado.find()
        .sort({[campoOrdenacao]: ordem})
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();
        
      res.status(200).send(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  }catch(err){
    next(err);
  }
}

export default paginar;
