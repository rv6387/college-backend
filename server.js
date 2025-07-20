const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3069;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static HTML from "public" folder

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rahul#@6387', // 🛑 Change if you set password in MySQL
  database: 'college'
});

// ✅ Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database.');
  }
});

// ✅ POST /register API to receive form data
app.post('/register', (req, res) => {
  const {
    name, email, phone, tenth, twelfth, password,
    gender, dob, languages, address, branch
  } = req.body;

  const sql = `
    INSERT INTO registration
    (name, email, phone, tenth_percent, twelfth_percent, password,
     gender, dob, languages, address, branch)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name, email, phone, tenth, twelfth, password,
    gender, dob, languages.join(','), address, branch
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Registration failed:", err.sqlMessage);
      res.status(500).send("Registration failed: " + err.sqlMessage);
    } else {
      res.send("✅ Registration successful!");
    }
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
