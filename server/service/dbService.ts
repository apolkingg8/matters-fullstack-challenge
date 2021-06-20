import * as IPFS from "ipfs"
import {OrbitDB as IOrbitDB} from 'orbit-db'
import Article from "../Schema/Article";
import KeyValueStore from "orbit-db-kvstore";

const OrbitDB = require('orbit-db')

class DbService {

    private ipfs = null
    private db: IOrbitDB = null
    private store: KeyValueStore<Article> = null

    getArticleById = async (articleId: string)=> {
        return this.store.get(articleId)
    }

    getAllArticles = async ()=> {
        return Object.values(this.store.all)
    }

    upsertArticle = async (article: Article)=> {
        await this.store.put(article.id, article)
        return true
    }

    removeArticle = async (articleId: string)=> {
        await this.store.del(articleId)
        return true
    }

    init = async ()=> {
        this.ipfs = await IPFS.create()
        this.db = await OrbitDB.createInstance(this.ipfs)
        this.store = await this.db.keyvalue("articleStore")
    }
}

export default new DbService()
