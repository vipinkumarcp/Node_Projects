const express = require("express");
const app = express()
const PORT = 6969;
const userData = require("./MOCK-DATA.json");
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql")
const { graphqlHTTP } = require("express-graphql");
const { resolve } = require("path/posix");




//schema is the combinations betweens muatations and queirys
//quiery means get data
//mutations means creates, update,delete



const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    }),
})

const RootQuery = new GraphQLObjectType({

    name: "RootQueryType",
    //fields differnt query
    fields: {
        //it will return all the users in database
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser: {
        type: UserType,
        args: {
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
                //eg: args.firstName will pass firstname to muatation
                resolve(parent, args) {
                    //individual adding the number
                    //here we put the database operation -db.query.insert ..here it is fake data

                    userData.push({
                        id: userData.length + 1,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
                        password: args.password,
                      });
                      
                    //return is equivalent to res.send in rest api
                    return args;
                }
            }
        }
    }
)




const schema = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})



//graphql have only single route
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(PORT, () => {
    console.log("server is running")
})