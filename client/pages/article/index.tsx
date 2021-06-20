import React, {FC, useEffect} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";

export interface ArticlesPageProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {

    },
})))

let ArticlesPage: FC<ArticlesPageProps> = (props) => {
    let styles = getStyles()

    useEffect(()=> {
        location.href = "/article/p/1"
    }, [])

    return null
}

export default observer(ArticlesPage)
