import {Field, ObjectType} from "type-graphql";

@ObjectType()
export default class Article {

    @Field()
    title: string

    @Field()
    content: string

}
