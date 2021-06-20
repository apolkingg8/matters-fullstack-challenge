import IArticle from "../../common/IArticle";
import {v4} from "uuid";
import envStore from "../store/envStore";

class ArticleService {

    add = async (title: string, content: string): Promise<IArticle> => {
        let article: IArticle = {
            id: v4(),
            title: title,
            content: content,
        }
        let query = `mutation add_article($article: ArticleInput!) {
            addArticle(article: $article) {
                id
                title
                content
            }
        }`
        let fetched = await fetch(`${envStore.serverUrl}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    article: article,
                },
            }),
        })
        let json = await fetched.json()

        return json['data']['addArticle']
    }

    delete = async (articleId: string)=> {

    }

    getAll = async (): Promise<IArticle[]> => {
        let query = `query get_all_articles {
            articles {
                id
                title
                content
            }
        }`
        let fetched = await fetch(`${envStore.serverUrl}/graphql`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
            }),
        })
        let json = await fetched.json()

        return json['data']['articles']
    }

    getSome = async (skip: number, take: number): Promise<IArticle[]> => {
        return []
    }
}

export default new ArticleService()
