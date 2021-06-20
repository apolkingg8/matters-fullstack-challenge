import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import articleService from "../../../service/articleService";
import {useRouter} from "next/router";
import styleStore from "../../../store/styleStore";
import IArticle from "../../../../common/IArticle";
import themeStore from "../../../store/themeStore";

export interface ArticleListPageProps {

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

let ArticleListPage: FC<ArticleListPageProps> = (props) => {
    let [articles, setArticles] = useState<IArticle[]>([])
    let [pages, setPages] = useState<boolean[]>([])
    let router = useRouter()
    let currentPage: number = parseInt(router.query['page'] as string)
    let perPage = 2
    let styles = getStyles()

    useEffect(()=> {
        let getArticles = async ()=> {
            let skip = (currentPage - 1) * perPage
            let articles = await articleService.getSome(skip, perPage)

            setArticles(articles)
        }

        currentPage && getArticles()
    }, [currentPage])

    useEffect(()=> {
        let getArticles = async ()=> {
            let total = await articleService.getTotalCount()
            let pages = []

            for(let i=0; i<total; i+=perPage) {
                pages.push(true)
            }

            setPages(pages)
        }

        getArticles()
    }, [])

    return (
        <div className={styles.wrap}>
            {currentPage}
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
            {pages.map((val, i)=> {
                return (
                    <a
                        key={i}
                        href={`/article/p/${i + 1}`}
                    >
                        {i + 1}
                    </a>
                )
            })}
        </div>
    )
}

export default observer(ArticleListPage)
