module.exports = app => {
    app.get('/', (req, res) => {
        res.render('landing');
    });

    app.get('/meals', (req, res) => {
        res.render('meals');
    });
}