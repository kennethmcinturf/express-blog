module.exports = async (req, res, next) => {
    console.log(req.body);
    if(req.files == null || req.body.title == null || req.body.title == null){
        let validationErrors = [];

        if (req.files == null) {
            validationErrors.push('Post must have image');
        }

        if (req.body.title == null) {
            validationErrors.push('Post must have a title');
        }

        if (req.body.title == null) {
            validationErrors.push('Post must have a title');
        }

        return res.redirect('/posts/new');
    }
    next();
};