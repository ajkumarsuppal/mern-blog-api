const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema(
  {
    date: { type: Date, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
)
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
