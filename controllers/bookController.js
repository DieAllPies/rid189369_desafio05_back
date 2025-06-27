const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/books.json');

function loadBooks() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

exports.getAllBooks = (req, res) => {
  const books = loadBooks();
  res.json(books);
};

exports.getBookById = (req, res) => {
  const books = loadBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};
exports.createBook = (req, res) => {
  const { titulo, num_paginas, isbn, editora } = req.body;

  if (!titulo || !num_paginas || !isbn || !editora) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const books = loadBooks();

  const lastId = books.length ? books[books.length - 1].id : 0;
  const newId = lastId + 1;

  const newBook = {
    id: newId,
    titulo,
    num_paginas: parseInt(num_paginas),
    isbn,
    editora
  };

  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const books = loadBooks();
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books[index] = { ...books[index], ...req.body };
  saveBooks(books);
  res.json(books[index]);
};

exports.deleteBook = (req, res) => {
  const books = loadBooks();
  const updatedBooks = books.filter(b => b.id !== parseInt(req.params.id));
  saveBooks(updatedBooks);
  res.json({ message: 'Book deleted' });
};
