import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import articleService from "../../service/articleService";
import IArticle from "../../../common/IArticle";

export interface ArticlesPageProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {

    },
})))

let ArticlesPage: FC<ArticlesPageProps> = (props) => {
    let [articles, setArticles] = useState<IArticle[]>([])
    let styles = getStyles()

    useEffect(()=> {
        let getArticles = async ()=> {
            let articles = await articleService.getAll()
            setArticles(articles)
        }

        getArticles()
    }, [])

    return (
        <div className={styles.wrap}>
            {articles.map((article)=> {
                return (
                    <div>
                        {article.id} {article.title} {article.content}
                    </div>
                )
            })}
        </div>
    )
}

export default observer(ArticlesPage)
