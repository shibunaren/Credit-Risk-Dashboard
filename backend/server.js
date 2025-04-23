const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let data = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));

app.get('/customers', (req, res) => res.json(data));

app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  data = data.map(c => c.customerId === id ? { ...c, status } : c);
  res.sendStatus(200);
});

app.post('/alerts', (req, res) => {
  const { customerId, score } = req.body;
  console.log(` Alert! High-risk customer: ${customerId}, Score: ${score}`);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));