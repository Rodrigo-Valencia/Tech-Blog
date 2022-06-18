const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================')
    Post.findAll({
        where: {
            userId: req.session.userId
        },
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
        res.render('dashboard', { posts, loggedIn: true });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post in dashbaord with ID
router.get('edit/:id', withAuth, (req, res) => {
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

            res.render('edit-post', {
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

// create new post for Dashboard
router.get('/create', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        },
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
        res.render('create-post', { 
            posts, 
            loggedIn: true 
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;