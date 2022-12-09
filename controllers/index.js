const { response } = require("express");
const User = require('../models/user');
const Cat = require('../models/cat');
const Trigger=require('../models/trigger');
const { db } = require("../models/user");


const getUsers=async(req,res)=>{
  try {
    const users = await User.find({})
    return res.status(200).json({ users })
} catch (error) {
    return res.status(500).send(error.message);
}
}

const getCats=async(req,res)=>{
  try {
    const cats = await Cat.find({}).populate("trigger_id")
    return res.status(200).json({ cats })
} catch (error) {
    return res.status(500).send(error.message);
}
}
const getTriggers=async(req,res)=>{
  try {
    const triggers = await Trigger.find({})
    return res.status(200).json({ triggers })
} catch (error) {
    return res.status(500).send(error.message);
}
}
const getTriggerById=async(req,res)=>{
  try {
    const {id}=req.params;
    const trigger = await Trigger.findById(id)
    return res.status(200).json({ trigger })
} catch (error) {
    return res.status(500).send(error.message);
}
}

const getUserWithCats = async(req,res)=> {
  try {
    const {id}=req.params
    const userCats = await User.findById(id).populate("cat_id")
    return res.status(200).json({userCats})
  } catch (error) {
    return res.status(500).send(error.message);
}
  
};
// const getCatWithTriggers = async(req,res)=> {
//   try {
//     const { id }=req.params;
//     console.log(req.params)
//     const cat_triggers = await Cat.findById(id).populate("trigger_id");
//     return res.status(200).json({cat_triggers})
//   } catch (error) {
//     return res.status(500).send(error.message);
// }
  
// };
const getCatWithTriggers = async(req,res)=> {
  try {
    const { id }=req.params;
    console.log(req.params)
    const cat_triggers = await Cat.aggregate([{$lookup:{from:"Trigger",localField:"trigger_id",foreignField:'_id',as:"triggers"}}])
    return res.status(200).json({cat_triggers})
  } catch (error) {
    return res.status(500).send(error.message);
}
  
};

module.exports={
  getUsers,
  getCats,
  getTriggers,
  getUserWithCats,
  getCatWithTriggers,
  getTriggerById
}