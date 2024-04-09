const { useParams } = require("react-router-dom/cjs/react-router-dom.min");
const mangaService = require("../services/manga.service");

async function list(req, res) {
    let manga;
      manga = await mangaService.list();
    res.json({
      data: manga,
    });
  }

  async function listComments(req, res) {
    let comments;
      comments = await mangaService.listComments();
    res.json({
      data: comments,
    });
  }

  async function read(req, res) {
    const manga_id = req.params.manga_id; // Corrected syntax to get manga_id from params
    let manga;
    let comments;
    manga = await mangaService.read(manga_id);
    comments = await mangaService.listComments(manga_id); 
    res.json({
      manga: manga,
      comments: comments,
    });
}

const createComment = async (req, res) => {
  try {
    const commentData = req.body;
    const newComment = await mangaService.createComment(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' }); 
  }
};

module.exports = {
  list,
  read,
  createComment,
  listComments
};
