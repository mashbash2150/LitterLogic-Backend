const {User, Cat}= require('../models')

const getAllCats=async(req,res)=>{
  try {
    const cats = await Cat.findAll()
    res.send(cats)
} catch (error) {
    return res.status(500).send(error.message);
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

const updateCat = async (req, res) => {
  try {
    let catId=parseInt(req.params.cat_id)
    let updatedCat=await Cat.update(req.body,{
      where:{id:catId},
      returning:true
    })
    res.send(updatedCat)
  } catch (error) {
      throw error
  } 
}

const deleteCat = async (req, res) => {
  try {
    let catId=parseInt(req.params.cat_id)
    await Cat.destroy({where:{id:catId}})
      res.send({message:`Deleted Cat with id of ${catId}`})
  } catch (error) {
      throw error
  } 
}






module.exports ={
  getAllCats,
  getOwnerCats,
  createCat,
  updateCat,
  deleteCat
}