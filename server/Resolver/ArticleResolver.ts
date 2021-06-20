import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Article from "../Schema/Article";
import ArticleInput from "../Schema/ArticleInput";
import dbService from "../service/dbService";

@Resolver()
export default class ArticleResolver {

    @Query(()=> ([Article]))
    async articles(
        @Arg("skip", {nullable: true}) skip: number,
        @Arg("take", {nullable: true}) take: number,
    ) {
        let allArticles = await dbService.getAllArticles()

        if(typeof skip === "number" && typeof take === "number") {
            return allArticles.slice(skip, skip + take)
        } else {
            return allArticles
        }
    }

    @Query(()=> (Number))
    async articlesCount() {
        let allArticles = await dbService.getAllArticles()

        return allArticles.length
    }

    @Mutation(()=> (Article))
    async addArticle(
        @Arg("article") article: ArticleInput
    ) {
        await dbService.upsertArticle(article)

        return await dbService.getArticleById(article.id)
    }

    @Mutation(()=> (String))
    async removeArticle(
        @Arg("articleId") articleId: string
    ) {
        await dbService.removeArticle(articleId)

        return articleId
    }
}
