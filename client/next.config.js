module.exports = {
    webpackDevMiddileware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
}