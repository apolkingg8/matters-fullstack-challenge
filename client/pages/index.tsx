import React, {FC} from "react";
import {observer} from "mobx-react";
import {computedFn} from "mobx-utils";
import {stylesheet} from "typestyle";

export interface indexProps {

}

let getStyles = computedFn(() => (stylesheet({
    wrap: {

    },
})))

let index: FC<indexProps> = (props) => {
    let styles = getStyles()

    return (
        <div className={styles.wrap}>
            Amingo!
        </div>
    )
}

export default observer(index)
