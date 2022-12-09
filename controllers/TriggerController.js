const {User, Cat,Trigger}= require('../models')


const createTrigger = async (req, res) => {
  try {
    let cat_id=parseInt(req.params.cat_id)
    let triggerBody={
      cat_id,
      ...req.body
    }
      const newTrigger = await Trigger.create(triggerBody)
      res.send(newTrigger)
  } catch (error) {
      throw error
  } 
}





const getCatTriggers=async(req,res)=>{
  try {
    let catId=parseInt(req.params.cat_id)
    const triggers = await Trigger.findAll({where:{cat_id:catId}})
    res.send(triggers)
} catch (error) {
    return res.status(500).send(error.message);
}
}
// const getTriggerById=async(req,res)=>{
//   try {
//     const {id}=req.params;
//     const trigger = await Trigger.findById(id)
//     return res.status(200).json({ trigger })
// } catch (error) {
//     return res.status(500).send(error.message);
// }
// }

module.exports={
  getCatTriggers,
  createTrigger

}