const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/livros', bookRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running`);
});
