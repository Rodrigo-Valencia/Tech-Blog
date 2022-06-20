const { Post } = require('../models');

const posts = [
    {
        title: 'testPost1',
        content: 'testcontent1',
        userId: 1
    },
    {
        title: 'testPost2',
        content: 'testcontent2',
        userId: 2
    },
    {
        title: 'testPost3',
        content: 'testcontent3',
        userId: 3
    }
];

const postSeeds = () => Post.bulkCreate(posts);

module.exports = postSeeds;