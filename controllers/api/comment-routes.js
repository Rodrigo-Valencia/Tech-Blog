const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    if (req.session) {
        Comment.create({
            commentText: req.body.commentText,
            userId: req.session.userId,
            postId: req.body.postId,
        }).then(commentData => res.json(commentData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    }
});

router.delete('/:id', (req, res) => {
    if (req.session) {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        }).then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'No comment found!' });
                return;
            }
            res.json(commentData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

module.exports = router;