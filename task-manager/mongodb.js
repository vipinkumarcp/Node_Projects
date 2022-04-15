
// const mongodb = require('mongodb')

//mongo client gives acess to neccessary function to connect mongodb and do crud operations
// const MongoClient = mongodb.MongoClient

// //helps to work with id
// const objectID = mongodb.ObjectId


//by destrutruing way

const {MongoClient,ObjectId}= require('mongodb')


//defining conection url
const connectionURL = 'mongodb://127.0.0.1:27017'
//database name -any name
const databaseName = 'task-manager'

//to store id
// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())

//connection mongo client
//second argument is call back function when it connected to database

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log('unable to connect t database')
    }


    //console.log('Connected correctly')
    //
    const db = client.db(databaseName)
    //inserting a user
    // db.collection('users').insertOne({
    //     name:'Vipin',
    //     age:27
    // }, (error,result)=>{

    //     if(error){
    //         return console.log('unable to insert user')
    //     }

    //     console.log(result.insertedId)

    // })


    //insertingMany 

    // db.collection('users').insertMany([

    //     {
    //         name: 'john',
    //         age: 28

    //     },
    //     {
    //         name: 'rockey',
    //         age: 36
    //     }


    // ],(error,result)=>{
    //     if (error){

    //         return console.log('unable to insert document')

    //     }
    //     console.log(result.insertedIds)

    // })

    //  read

    // db.collection('users').findOne({_id:new ObjectId("6255a6b425968acc0f8e7537")},(error,user)=>{
    //     if(error){
    //         return console.log('unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({age:27}).toArray((error,users)=>{
    //     console.log(users)
    // })
    // db.collection('users').find({age:27}).count((error,count)=>{
    //     console.log(count)
    // })



    //updateing documents

//   db.collection('users').updateOne({
//         _id: new ObjectId("6255a6b425968acc0f8e7537")

//     },{

//             $set:{

//                 name:'Mike'

//             }

//     }).then((result)=>{

//         console.log(result)

//     }).catch((error)=>{

//         console.log(error)

//     })

//deleting document



db.collection('users').deleteMany({

    age:27
    
}).then((result)=>{
    console.log(result)

}).catch((error)=>{

    console.log(error)

})

})