import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {useRouter} from "next/router";
import IArticle from "../../../common/IArticle";
import styleStore from "../../store/styleStore";
import articleService from "../../service/articleService";

export interface ArticlePageProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {
        ...styleStore.full,
        ...styleStore.centerCol,
    },
    title: {

    },
    content: {

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

        articleId && getArticle()
    }, [articleId])

    if(!article) {
        return <div/>
    }

    return (
        <div className={styles.wrap}>
            {article.title} {article.content}
        </div>
    )
}

export default observer(ArticlePage)
