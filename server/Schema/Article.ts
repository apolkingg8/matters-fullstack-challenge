import {Field, ObjectType} from "type-graphql";
import {v4} from "uuid";

@ObjectType()
export default class Article {

    @Field()
    id: string = v4()

    @Field()
    title: string = ``

    @Field()
    content: string = ``

    constructor(props: Partial<Article>) {
        Object.assign(this, props)
    }
}
