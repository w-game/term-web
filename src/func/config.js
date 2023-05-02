function isDev() {
    return process.env.NODE_ENV === "development"
}

const config = {
    api: isDev() ? "http://localhost:8000/" : "http://bizer.co:8000/"
}

export default config