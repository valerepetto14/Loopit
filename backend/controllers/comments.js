const User = require("../models/users");
const Loop = require("../models/loops");
const Comment = require("../models/comments");
const jwt = require("jsonwebtoken");
const { key } = require("../config");
const { sequelize } = require("../database/db");

const addComment = async (req, res) => {
  const { content, loop_id } = req.body;
  const token = req.cookies.token;
  if (!content || !loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
    const loop = await Loop.findByPk(loop_id);
    console.log("holaaaaaa");
    if (!loop) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - loop does not exist",
      });
    }
    console.log("holaaaa");
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - user does not exist",
      });
    }
    const new_comment = await Comment.create({
      user_id: user_id,
      loop_id: loop_id,
      content: content,
    });
    const add_countComments = await Loop.update({
      count_comments: loop.count_comments + 1,
    },{
      where: {
        id: loop_id,
      }
    })
    res.status(200).json({
      status: "OK",
      data: new_comment,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  if (!comment_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const comment_destroy = await Comment.findByPk(comment_id);
    if (!comment_destroy) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - comment id does not exist",
      });
    }
    await comment_destroy.destroy();
    res.status(200).json({
      status: "OK",
      data: [],
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - comment id does not exist",
      });
    }
    const { content } = req.body;
    if (content) {
      Comment.content = content;
    }
    await comment.save();
    res.status(200).json({
      status: "OK",
      content: content,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

// HACER FUNCION PARA TRAER TODOS LOS COMENTARIOS DE UN LOOP

module.exports = {
  addComment: addComment,
  deleteComment: deleteComment,
  updateComment: updateComment,
};
