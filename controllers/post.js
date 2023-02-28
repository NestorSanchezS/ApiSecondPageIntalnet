const Post = require("../models/post");
const image = require("../utils/image");

function createPost(req, res) {
  const post = new Post(req.body);
  post.created_at = new Date();
  const imagePath = image.getFilePath(req.files.miniature);
  post.miniature = imagePath;
  post.save((error, postStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear post" });
    } else {
      res.status(200).send(postStored);
    }
  });
}

function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  Post.paginate({}, options, (error, posts) => {
    if (error) {
      res.status(400).send({ msg: "Post not found" });
    } else {
      res.status(200).send(posts);
    }
  });
}

module.exports = { createPost, getPosts };
