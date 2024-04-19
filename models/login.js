const mongoose = require('mongoose')

// URL адреса бази даних MongoDB Atlas
const DB_URL =
  'mongodb+srv://petryxanko:12345@cluster-susi.zpj8h6x.mongodb.net/?retryWrites=true&w=majority'

// Підключення до бази даних
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error))

module.exports = mongoose.connection

// Схема користувача
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
})

module.exports = mongoose.model('User', userSchema)
