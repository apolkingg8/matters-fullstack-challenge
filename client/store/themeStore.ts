import {createMuiTheme, Theme} from "@material-ui/core";
import {makeAutoObservable} from "mobx";

class ThemeStore {

    theme: Theme = createMuiTheme({
        palette: {
            type: "dark",
        },
    })

    constructor() {
        makeAutoObservable(this)
    }
}

export default new ThemeStore()
