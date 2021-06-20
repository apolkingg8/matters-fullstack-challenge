import "reflect-metadata";
import * as express from "express"
import {buildSchema} from "type-graphql";
import ArticleResolver from "./Resolver/ArticleResolver";
import {ApolloServer} from "apollo-server-express";
import dbService from "./service/dbService";

let app = express()
let port =  process.env.PORT || 3718

let startServer = async ()=> {
    let schema = await buildSchema({
        resolvers: [ArticleResolver],
    })

    let apolloServer = new ApolloServer({
        schema: schema,
        playground: true,
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({
        app: app,
    })

    await new Promise<void>((resolve)=> {
        app.listen({
            port: port
        }, resolve)
    })

    await dbService.init()

    console.log(`App on: http://localhost:${port}${apolloServer.graphqlPath}`)
}

startServer()
