import {makeAutoObservable} from "mobx";
import {NestedCSSProperties} from "typestyle/lib/types";
import {percent} from "csx";
import {cssRule} from "typestyle";

class StyleStore {

    centerRow: NestedCSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }

    centerCol: NestedCSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }

    full: NestedCSSProperties = {
        width: percent(100),
        height: percent(100),
    }

    absFull: NestedCSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: percent(100),
        height: percent(100),
    }

    transition: NestedCSSProperties = {
        transitionDuration: `150ms`,
        transitionProperty: "all",
    }

    constructor() {
        makeAutoObservable(this)
        cssRule(`html, body, #root`, {
            width: percent(100),
            height: percent(100),
            background: "transparent",
            borderRadius: 8,
            overflow: "hidden",
        })
        cssRule(`*`, {
            userSelect: "none",
            outline: "none",
        })
    }
}

export default new StyleStore()
