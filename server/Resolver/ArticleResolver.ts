import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Article from "../Schema/Article";
import ArticleInput from "../Schema/ArticleInput";
import dbService from "../service/dbService";

@Resolver()
export default class ArticleResolver {

    @Query(()=> ([Article]))
    async articles() {
        let allArticles = dbService.getAllArticles()

        return allArticles
    }

    @Mutation(()=> (Article))
    async addArticle(
        @Arg("article") article: ArticleInput
    ) {
        await dbService.upsertArticle(article)
        let res = dbService.getArticleById(article.id)

        return res
    }

    @Mutation(()=> ([Article]))
    async removeArticle(
        @Arg("articleId") articleId: string
    ) {
        return []
    }
}
