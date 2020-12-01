module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render('create', {
            errors: req.flash('validationErrors')
        });
    }

    res.redirect('/auth/login');
};