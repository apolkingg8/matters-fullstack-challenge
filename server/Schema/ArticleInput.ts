import {Field, InputType} from "type-graphql";
import {v4} from "uuid";
import IArticle from "../../common/IArticle";

@InputType()
export default class ArticleInput implements IArticle {

    @Field()
    id: string = v4()

    @Field()
    title: string = ``

    @Field()
    content: string = ``

}
