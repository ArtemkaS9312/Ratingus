const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');
const router = require('./router/index')

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ratingus',
  password: '123',
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use('/api', router);



app.get('/api/users', async (req, res) => {
  try {
      let query = 'SELECT * FROM users';
      const queryParams = [];
      const conditions = [];

      if (req.query.minRating) {
          conditions.push(`rating_position >= $${queryParams.length + 1}`);
          queryParams.push(req.query.minRating);
      }

      if (req.query.maxRating) {
          conditions.push(`rating_position <= $${queryParams.length + 1}`);
          queryParams.push(req.query.maxRating);
      }

      if (req.query.departments) {
          const departments = req.query.departments.split(',');
          conditions.push(`department IN (${departments.map((_, i) => `$${i + queryParams.length + 1}`).join(', ')})`);
          queryParams.push(...departments);
      }

      if (conditions.length > 0) {
          query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY rating_position DESC';

      const result = await pool.query(query, queryParams);
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

app.post('/api/users/add', async (req, res) => {
  const { full_name, birth_date, phone, department, rating_position } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (full_name, birth_date, phone, department, rating_position) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [full_name, birth_date, phone, department, rating_position]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, birth_date, phone, department, rating_position } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET full_name = $1, birth_date = $2, phone = $3, department = $4, rating_position = $5 WHERE id = $6 RETURNING *',
      [full_name, birth_date, phone, department, rating_position, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.send('User deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const result = await pool.query('SELECT department, COUNT(*) as count FROM users GROUP BY department');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/users/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM users');
    res.json({ count: result.rows[0].count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});