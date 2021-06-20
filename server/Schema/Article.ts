import {Field, ObjectType} from "type-graphql";
import {v4} from "uuid";
import IArticle from "../../common/IArticle";

@ObjectType()
export default class Article implements IArticle {

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
