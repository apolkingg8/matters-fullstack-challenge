import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import articleService from "../../service/articleService";
import IArticle from "../../../common/IArticle";
import themeStore from "../../store/themeStore";
import styleStore from "../../store/styleStore";

export interface ArticlesPageProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {
        ...styleStore.full,
        ...styleStore.centerCol,
    },
    card: {
        width: 480,
        margin: 16,
        padding: 16,
        background: themeStore.theme.palette.background.paper,
        borderRadius: 8,
    },
    title: {
        ...themeStore.theme.typography.h4,
        marginBottom: 8,
    },
    content: {
        ...themeStore.theme.typography.body1,
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
                    <a
                        className={styles.card}
                        href={`/article/${article.id}`}
                    >
                        <div className={styles.title}>
                            {article.title}
                        </div>
                        <div className={styles.content}>
                            {article.content}
                        </div>
                    </a>
                )
            })}
        </div>
    )
}

export default observer(ArticlesPage)
