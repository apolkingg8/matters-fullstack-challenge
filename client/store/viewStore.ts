import {makeAutoObservable} from "mobx";

class ViewStore {

    isLoading: boolean = false

    success: string = null
    error: string = null

    constructor() {
        makeAutoObservable(this)
    }
}

export default new ViewStore()
