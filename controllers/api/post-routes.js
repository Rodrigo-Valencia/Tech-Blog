const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================')
    Post.findAll({
        attributes: ['id', 'posts', 'title', 'created'],

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
    }).then(postData => res.json(postData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// get user with ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'posts', 'title', 'created'],

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
        if (!postData) {
            res.status(404).json({ message: 'No post found!' });
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create post
router.post('/', (req, res) => {
     Post.create({
        title: req.body.title,
        posts: req.body.posts,
        userId: req.session.userId
     }).then(postData => res.json(postData))
       .catch(err => {
        console.log(err);
        res.status(500).json(err);
       });
    
});

// Update
router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        posts: req.body.posts
    },
    {
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found!' });
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

// delete
router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found!' });
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;