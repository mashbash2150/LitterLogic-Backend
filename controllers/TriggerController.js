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

const getTriggerById = async (req, res) => {
  try {
    let triggerId=parseInt(req.params.trigger_id)
    let trigger=await Trigger.findAll({where:{id:triggerId}})
     res.send(trigger)
  } catch (error) {
    return res.status(500).send(error.message);
  } 
}

const updateTrigger = async (req, res) => {
  try {
    let triggerId=parseInt(req.params.trigger_id)
    let updatedTrigger=await Trigger.update(req.body,{
      where:{id:triggerId},
      returning:true
    })
    res.send(updatedTrigger)
  } catch (error) {
      throw error
  } 
}

const deleteTrigger = async (req, res) => {
  try {
    let triggerId=parseInt(req.params.trigger_id)
    await Trigger.destroy({where:{id:triggerId}})
      res.send({message:`Deleted Trigger with id of ${triggerId}`})
  } catch (error) {
      throw error
  } 
}


module.exports={
  getCatTriggers,
  createTrigger,
  updateTrigger,
  deleteTrigger,
  getTriggerById

}