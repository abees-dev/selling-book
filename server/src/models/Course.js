import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: { type: String },
  author: { type: String },
  price: { type: Number },
  slug: { type: String },
  details: { type: String },
  instructor: { type: String },
  imageUrl: { type: String },
  duration: { type: Number },
  certificate: { type: Boolean },
  language: { type: String },
  access: { type: String },
});

CourseSchema.plugin(paginate);

module.exports = mongoose.model('Courses', CourseSchema);
