import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";
import {Snackbar} from "@material-ui/core";
import viewStore from "../store/viewStore";
import {Alert} from "@material-ui/lab";

export interface SuccessSnackBarProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {},
})))

let SuccessSnackBar: FC<SuccessSnackBarProps> = (props) => {
    let styles = getStyles()

    return (
        <Snackbar
            open={Boolean(viewStore.success)}
            autoHideDuration={3000}
            onClose={()=> {
                viewStore.success = null
            }}
        >
            <Alert severity={"success"}>{viewStore.success}</Alert>
        </Snackbar>
    )
}

export default observer(SuccessSnackBar)
