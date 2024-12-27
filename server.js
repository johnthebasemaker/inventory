const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Dummy data (replace with database later)
let inventory = [
    { id: 1, name: "Material A", stock: 100 },
    { id: 2, name: "Material B", stock: 50 }
];

// Get inventory
app.get('/inventory', (req, res) => {
    res.json(inventory);
});

// Add new material
app.post('/inventory', (req, res) => {
    const newMaterial = req.body;
    inventory.push(newMaterial);
    res.json({ message: "Material added successfully!" });
});

// Update stock
app.put('/inventory/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { stock } = req.body;
    const material = inventory.find(item => item.id === id);

    if (material) {
        material.stock = stock;
        res.json({ message: "Stock updated successfully!" });
    } else {
        res.status(404).json({ message: "Material not found" });
    }
});

// Delete material
app.delete('/inventory/:id', (req, res) => {
    const id = parseInt(req.params.id);
    inventory = inventory.filter(item => item.id !== id);
    res.json({ message: "Material deleted successfully!" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
