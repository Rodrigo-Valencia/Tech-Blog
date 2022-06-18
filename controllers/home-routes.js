const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log(req.session);
    console.log('======================')
    Post.findAll({
        attributes: ['id', 'post', 'title', 'created'],

        include: [
            {
                model: Comment,
                attributes: ['id', 'commentText', 'postId', 'userId', 'created'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// homepage post with ID
router.get('post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post', 'title', 'created'],

        include: [
            {
                model: Comment, 
                attributes: ['id', 'commentText', 'postId', 'userId', 'created'],
                include: {
                    User,
                    attributes: ['username']
                }
            },
            {
                model: User, 
                attributes: ['username'],
            }
        ]
    }).then(postData => {
        if (postData) {
            const post = postData.get({ plain: true });

            res.render('single-post', {
                post,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// homepage login form
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// homepage signup form
router.get('/sign-up', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('sign-up');
});

module.exports = router;