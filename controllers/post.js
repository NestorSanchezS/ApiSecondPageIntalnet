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

function updatePost(req, res) {
  const { id } = req.params;
  const postData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    postData.miniature = imagePath;
  }

  Post.findByIdAndUpdate({ _id: id }, postData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar post" });
    } else {
      res.status(200).send({ msg: "Post actualizado" });
    }
  });
}

function deletePost(req, res) {
  const { id } = req.params;

  Post.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar post" });
    } else {
      res.status(200).send({ msg: "Post Eliminado" });
    }
  });
}

module.exports = { createPost, getPosts, updatePost, deletePost };
