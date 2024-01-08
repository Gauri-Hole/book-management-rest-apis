const Book = require('../models/Book');

const publishBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const userId = req.user.userId;

    const newBook = new Book({ title, author, userId, published: true });
    await newBook.save();

    res.status(201).json({ message: 'Book published successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const searchBooks = async (req, res) => {
  try {
    const searchQuery = req.query.title;

    const books = await Book.find({ title: { $regex: new RegExp(searchQuery, 'i') } });
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const unpublishBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.userId;

    const book = await Book.findOne({ _id: bookId, userId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.published = false;
    await book.save();

    res.status(200).json({ message: 'Book unpublished successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const books = await Book.find({ userId });
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllPublishedBooks = async (req, res) => {
  try {
    const books = await Book.find({ published: true });
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { publishBook, searchBooks, unpublishBook, getUserBooks, getAllPublishedBooks };
