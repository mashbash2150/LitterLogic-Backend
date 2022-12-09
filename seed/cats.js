const db = require('../db')
const Cat = require('../models/cat')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const cats = [
        { name: 'Feta', age: 7,weight:8.6, vet: 'Dr. Schmidt', healthConditions:["UTI"]},
        { name: 'Beef', age: 10,weight:7, vet: 'Dr. Schmidt', healthConditions:["Kidney Diseasse"]},
        { name: 'Greenie', age: 15,weight:6.1, vet: 'Dr. Schmidt', healthConditions:["Kidney Cancer"]},
        { name: 'Oaf', age: 12,weight:10, vet: 'Dr. Schmidt', healthConditions:["UTI"]},
        { name: 'Rick', age: 1,weight:5.2, vet: 'Dr. Schmidt', healthConditions:["UTI"]}

       
       
       
      
    ]

    await Cat.insertMany(cats)
    console.log("Created some cats!")
}
const run = async () => {
    await main()
    db.close()
}

run()