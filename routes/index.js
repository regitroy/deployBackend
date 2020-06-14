module.exports = (app) => {
    app.use('/', require('./auth'));
    app.use('/deployment', require('./deployment'));
}