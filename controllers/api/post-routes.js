const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================')
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'post', 'title', 'created_at'],

        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    }).then(dbPostData => res.json(dbPostData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post', 'title', 'created_at'],

        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    if (req.session) {
     Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
     }).then(dbPostData => res.json(dbPostData))
       .catch(err => {
        console.log(err);
        res.status(500).json(err);
       });
    }
});

router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    },
    {
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;