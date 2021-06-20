
class EnvStore {

    get isDev() {
        return process.env.NODE_ENV === "development"
    }

    get serverUrl() {
        return this.isDev
            ? `http://localhost:3718`
            : ``
    }
}

export default new EnvStore()
