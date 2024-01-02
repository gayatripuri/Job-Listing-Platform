
const mongoose=require('mongoose')
const app = require("./app");


mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 5000, })
  .then(() => {
    console.log('Database connection is successful');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

