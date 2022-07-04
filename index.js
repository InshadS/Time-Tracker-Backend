const express = require('express');
const app = express();
const PORT = 5000;
const basicRoutes = require('./Routes/index');

app.use(express.json());
app.use(basicRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
