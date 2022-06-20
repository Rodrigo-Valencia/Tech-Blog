const { Comment } = require('../models')

const comments = [
    {
        commentText: 'test1',
        userId: 1,
        postId: 1
    },
    {
        commentText: 'test2',
        userId: 2, 
        postId: 2
    },
    {
        commentText: 'test3',
        userId: 3, 
        postId: 3
    }
];

const commentSeeds = () => Comment.bulkCreate(comments)

module.exports = commentSeeds;