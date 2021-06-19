import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {AppProps} from "next/app";
import themeStore from "../store/themeStore";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";

let getStyles = computedFn(() => (stylesheet({
    wrap: {},
})))

let MyApp: FC<AppProps> = (props) => {
    let {Component, pageProps} = props
    let styles = getStyles()

    return (
        <MuiThemeProvider theme={themeStore.theme}>
            <CssBaseline/>
            <Component {...pageProps}/>
        </MuiThemeProvider>
    )
}

export default observer(MyApp)
