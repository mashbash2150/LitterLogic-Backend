const db = require('../db')
const Trigger = require('../models/trigger')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const triggers = [
        { enterTime: '2022-12-08T08:24:05Z', exitTime: '2022-12-08T08:26:05Z', cat_id:"6392872d123e2097bc492743"},
        { enterTime: '2022-12-08T11:20:05Z', exitTime: '2022-12-08T11:24:05Z', cat_id:"6392872d123e2097bc492743"},
        { enterTime: '2022-12-07T10:30:05Z', exitTime: '2022-12-07T10:33:05Z', cat_id:"6392872d123e2097bc492743"},
        { enterTime: '2022-12-07T10:30:05Z', exitTime: '2022-12-07T10:31:05Z', cat_id:"6392872d123e2097bc492743"},
        { enterTime: '2022-12-08T11:30:05Z', exitTime: '2022-12-08T11:32:05Z', cat_id:"6392872d123e2097bc492745"},
        { enterTime: '2022-12-08T11:30:05Z', exitTime: '2022-12-08T11:32:05Z', cat_id:"6392872d123e2097bc492745"},
        { enterTime: '2022-12-08T11:30:05Z', exitTime: '2022-12-08T11:32:05Z', cat_id:"6392872d123e2097bc492746"},
        { enterTime: '2022-12-08T11:30:05Z', exitTime: '2022-12-08T11:32:05Z', cat_id:"6392872d123e2097bc492743"},
        { enterTime: '2022-12-08T11:30:05Z', exitTime: '2022-12-08T11:32:05Z', cat_id:"6392872d123e2097bc492746"},
        { enterTime: '2022-12-08T11:30:05Z', exitTime: '2022-12-08T11:32:05Z', cat_id:"6392872d123e2097bc492747"},
    
       
      
      
    ]

    await Trigger.insertMany(triggers)
    console.log("Created some triggers!")
}
const run = async () => {
    await main()
    db.close()
}

run()