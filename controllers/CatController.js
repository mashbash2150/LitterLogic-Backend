const {User, Cat}= require('../models')


const createCat = async (req, res) => {
  try {
    let owner_id=parseInt(req.params.user_id)
    let catBody={
      owner_id,
      ...req.body
    }
      const newCat = await Cat.create(catBody)
      res.send(newCat)
  } catch (error) {
      throw error
  } 
}

const getOwnerCats=async(req,res)=>{
  try {
    let ownerId=parseInt(req.params.user_id)
    const cats = await Cat.findAll({where:{owner_id:ownerId}})
    res.send(cats)
} catch (error) {
    return res.status(500).send(error.message);
}
}




module.exports ={
  getOwnerCats,
  createCat
}