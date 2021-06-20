import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import viewStore from "../store/viewStore";
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";

export interface ErrorSnackBarProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {},
})))

let ErrorSnackBar: FC<ErrorSnackBarProps> = (props) => {
    let styles = getStyles()

    return (
        <Snackbar
            open={Boolean(viewStore.error)}
            autoHideDuration={3000}
            onClose={()=> {
                viewStore.error = null
            }}
        >
            <Alert severity={"error"}>{viewStore.error}</Alert>
        </Snackbar>
    )
}

export default observer(ErrorSnackBar)
