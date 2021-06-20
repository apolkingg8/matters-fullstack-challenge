import React, {FC, useState} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import styleStore from "../../store/styleStore";
import {Button, TextField} from "@material-ui/core";
import articleService from "../../service/articleService";
import viewStore from "../../store/viewStore";

export interface NewArticlePageProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {
        ...styleStore.full,
        ...styleStore.centerCol,
    },
    titleWrap: {
        width: 480,
        margin: 16,
    },
    contentWrap: {
        width: 480,
        margin: 16,
    },
    buttonWrap: {
        width: 480,
        margin: 16,
    },
})))

let NewArticlePage: FC<NewArticlePageProps> = (props) => {
    let [title, setTitle] = useState(``)
    let [content, setContent] = useState(``)
    let styles = getStyles()

    return (
        <div className={styles.wrap}>
            <div className={styles.titleWrap}>
                <TextField
                    label={`Title`}
                    fullWidth={true}
                    value={title}
                    onChange={(event)=> {
                        setTitle(event.target.value)
                    }}
                />
            </div>
            <div className={styles.contentWrap}>
                <TextField
                    label={`Content`}
                    fullWidth={true}
                    multiline={true}
                    rows={10}
                    value={content}
                    onChange={(event)=> {
                        setContent(event.target.value)
                    }}
                />
            </div>
            <div className={styles.buttonWrap}>
                <Button
                    fullWidth={true}
                    onClick={async ()=> {

                        viewStore.isLoading = true

                        try {
                            await articleService.add(title, content)
                            viewStore.success = `Save article success`
                        } catch (err) {
                            viewStore.error = `Save article fail`
                        }

                        viewStore.isLoading = false
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default observer(NewArticlePage)
