import mongoose from 'mongoose';
import Course from '../models/Course';
import cloudinary from '../utils/cloudinary';

class courseControllers {
  async createCourse(req, res) {
    const id = mongoose.Types.ObjectId();
    try {
      const {
        title,
        author,
        price,
        details,
        instructor,
        duration,
        certificate,
        language,
        access,
      } = req.body;

      if (!title) return res.status(400).json({ message: 'title is required' });

      const slug = title.replace(/\s/g, '-').toLowerCase();

      let upload = null;
      if (req?.file?.path) {
        upload = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: 'course',
          overwrite: true,
          public_id: id,
        });
      }

      const course = new Course({
        _id: id,
        title,
        price,
        author,
        details,
        slug,
        instructor,
        imageUrl: upload?.secure_url,
        duration,
        certificate,
        language,
        access,
      });
      await course.save();
      return res.status(200).json({ success: true, data: course });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
  async updateCourse(req, res) {
    const id = req.query.id;
    try {
      const {
        title,
        author,
        price,
        details,
        instructor,
        duration,
        certificate,
        language,
        access,
      } = req.body;

      if (!id)
        return res
          .status(410)
          .json({ success: false, message: 'Course is not exists' });
      if (!mongoose.isValidObjectId(id))
        return res
          .status(404)
          .json({ success: false, message: 'Course is not valid' });

      const slug = title.replace(/\s/g, '-').toLowerCase();

      let upload = null;
      if (req?.file?.path) {
        upload = await cloudinary.uploader.upload(req.file.path, {
          upload_preset: 'course',
          overwrite: true,
          public_id: id,
        });
      }

      const course = await Course.findByIdAndUpdate(
        id,
        {
          _id: id,
          title,
          price,
          author,
          details,
          slug,
          instructor,
          imageUrl: upload?.secure_url,
          duration,
          certificate,
          language,
          access,
        },
        { new: true }
      );
      return res.status(200).json({ success: true, data: course });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
  async getCourses(req, res) {
    try {
      const courses = await Course.find({});
      return res.status(200).json({ success: true, data: courses });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async getCourseByPage(req, res) {
    let { pages, limit } = req.query;
    if (!pages) pages = 1;
    if (!limit) limit = 6;
    try {
      const course = await Course.paginate({}, { page: pages, limit });
      const { docs, page, prevPage, nextPage, totalPages } = course;
      return res.status(200).json({
        success: true,
        data: docs,
        paginate: {
          page,
          prevPage,
          nextPage,
          totalPages,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'internal server error',
        error: error,
      });
    }
  }

  async deleteCourse(req, res) {
    try {
      const id = req.query.id;

      if (!id)
        return res
          .status(410)
          .json({ success: false, message: 'course is not exists' });
      if (!mongoose.isValidObjectId(id))
        return res
          .status(404)
          .json({ success: false, message: 'course is not valid' });

      await cloudinary.uploader.destroy(`products/course/${id}`);

      await Course.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'internal server error',
      });
    }
  }
}

module.exports = new courseControllers();
