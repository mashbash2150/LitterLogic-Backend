const db = require('../db')
const User = require('../models/user')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const users = [
        { firstName: 'Person', lastName: 'One', email: 'person1@person.com', notes:'Tracking Feta\'s recently diagnosed kidney issue'},
        { firstName: 'Person', lastName: 'Two', email: 'person2@person.com', notes:'Tracking Beef\'s recently diagnosed kidney issue'},
        { firstName: 'Person', lastName: 'Three', email: 'person3@person.com', notes:'Tracking Greenie\'s recently diagnosed kidney issue'},
        { firstName: 'Person', lastName: 'Four', email: 'person4@person.com', notes:'Tracking Oaf\'s recently diagnosed kidney issue'},
        { firstName: 'Person', lastName: 'Five', email: 'person5@person.com', notes:'Tracking Rick\'s recently diagnosed kidney issue'},
       
       
      
    ]

    await User.insertMany(users)
    console.log("Created some users!")
}
const run = async () => {
    await main()
    db.close()
}

run()