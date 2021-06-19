import {Query, Resolver} from "type-graphql";
import Article from "../Schema/Article";

@Resolver()
export default class ArticleResolver {

    @Query(()=> ([Article]))
    async articles() {
        return []
    }
}
