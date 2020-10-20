


module.exports =  {
    isLoggedIn: function(req, res, next) {
        return req.isAuthenticated() ? next() : res.redirect('/login');
    }
}
