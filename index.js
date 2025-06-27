const express = require('express');
const app = express();
const PORT = 3002;

const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Auth API running on http://localhost:${PORT}`);
});