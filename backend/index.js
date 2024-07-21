const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY',
});
const openai = new OpenAIApi(configuration);

app.post('/api/generate-code', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 1000,
    });
    res.json({ code: response.data.choices[0].text });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
