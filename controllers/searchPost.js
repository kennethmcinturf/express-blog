const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const queriedblogposts = await BlogPost.find({title: {$regex: '.*' + req.body.search + '.*' }});
    res.render('index', {
        blogposts : queriedblogposts
    });
};