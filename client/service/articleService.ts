import IArticle from "../../common/IArticle";
import {v4} from "uuid";

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
        let fetched = await fetch("http://localhost:3718/graphql", {
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
        return []
    }

    getSome = async (skip: number, take: number): Promise<IArticle[]> => {
        return []
    }
}

export default new ArticleService()
