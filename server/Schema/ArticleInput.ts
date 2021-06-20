import {Field, InputType} from "type-graphql";
import {v4} from "uuid";

@InputType()
export default class ArticleInput {

    @Field()
    id: string = v4()

    @Field()
    title: string = ``

    @Field()
    content: string = ``

}
