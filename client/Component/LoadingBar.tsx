import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {Fade, LinearProgress} from "@material-ui/core";
import {percent} from "csx";
import viewStore from "../store/viewStore";

export interface LoadingBarProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {
        position: "fixed",
        top: 0,
        left: 0,
        width: percent(100),
        height: 4,
    },
})))

let LoadingBar: FC<LoadingBarProps> = (props) => {
    let styles = getStyles()

    return (
        <Fade in={viewStore.isLoading}>
            <div className={styles.wrap}>
                <LinearProgress color={"primary"}/>
            </div>
        </Fade>
    )
}

export default observer(LoadingBar)
