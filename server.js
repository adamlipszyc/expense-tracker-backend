const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();

const PORT = 3000;


app.use(bodyParser.json());


app.get('/hello', (req, res) => {
    res.json({ body: "Hello World!"});
})



const handleGet = (req, res) => {
    db.all(`SELECT * FROM expenses`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ expenses: rows});
    });
}



app.get('/api/expenses', handleGet);


const handlePost = (req, res) => {
    const { description, amount, date, category } = req.body;
    db.run(`INSERT INTO expenses (category, amount, date, description) VALUES (?, ?, ?, ?)`, [category, amount, date, description], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.json({ status: "Accepted", id: this.lastID });
    })
}


app.post('/api/expenses', handlePost);


const handleDelete = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM expenses WHERE id = ?';
    db.run(query, id,  (err, rows) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json({ deletedID: id });
    });
      
};

// Delete an expense by ID
app.delete('/api/expenses/:id', handleDelete);


const handleUpdate = (req, res) => {
    const { id } = req.params;
    const { description, amount, date, category } = req.body;
  
    const query = `
      UPDATE expenses 
      SET description = ?, amount = ?, date = ?, category = ? 
      WHERE id = ?
    `;
  
    db.run(query, [description, amount, date, category, id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.json({ message: 'Expense updated successfully' });
    });
}

app.put('/api/expenses', handleUpdate);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
