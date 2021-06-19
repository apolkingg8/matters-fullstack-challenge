import {createMuiTheme, Theme} from "@material-ui/core";
import {makeAutoObservable} from "mobx";
import {cyan} from "@material-ui/core/colors";

class ThemeStore {

    theme: Theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: cyan,
        },
    })

    constructor() {
        makeAutoObservable(this)
    }
}

export default new ThemeStore()
