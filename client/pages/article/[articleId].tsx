import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {useRouter} from "next/router";

export interface ArticlePageProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {

    },
})))

let ArticlePage: FC < ArticlePageProps > = (props) => {
    let router = useRouter()
    let {articleId} = router.query
    let styles = getStyles()

    return (
        <div className={styles.wrap}>
            {articleId}
        </div>
    )
}

export default observer(ArticlePage)
