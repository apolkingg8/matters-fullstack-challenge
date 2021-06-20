import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {useRouter} from "next/router";
import IArticle from "../../../common/IArticle";
import styleStore from "../../store/styleStore";
import articleService from "../../service/articleService";
import themeStore from "../../store/themeStore";
import viewStore from "../../store/viewStore";

export interface ArticlePageProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {
        ...styleStore.full,
        ...styleStore.centerCol,
    },
    title: {
        ...themeStore.theme.typography.h4,
        marginBottom: 8,
    },
    content: {
        ...themeStore.theme.typography.body1,
    },
})))

let ArticlePage: FC < ArticlePageProps > = (props) => {
    let [article, setArticle] = useState<IArticle>(null)
    let router = useRouter()
    let {articleId} = router.query
    let styles = getStyles()

    useEffect(()=> {
        let getArticle = async ()=> {
            let article = await articleService.getById(articleId as string)
            setArticle(article)
        }

        try {
            articleId && getArticle()
        } catch (err) {
            viewStore.error = "Get article fail"
        }
    }, [articleId])

    if(!article) {
        return <div/>
    }

    return (
        <div className={styles.wrap}>
            <a href={`/article`}>
                Article list
            </a>
            <div className={styles.title}>
                {article.title}
            </div>
            <div className={styles.content}>
                {article.content}
            </div>
        </div>
    )
}

export default observer(ArticlePage)
