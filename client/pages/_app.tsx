import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {AppProps} from "next/app";
import themeStore from "../store/themeStore";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import SuccessSnackBar from "../Component/SuccessSnackBar";
import ErrorSnackBar from "../Component/ErrorSnackBar";
import LoadingBar from "../Component/LoadingBar";

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
            <SuccessSnackBar/>
            <ErrorSnackBar/>
            <LoadingBar/>
        </MuiThemeProvider>
    )
}

export default observer(MyApp)
