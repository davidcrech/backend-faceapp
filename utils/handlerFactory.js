const AppError = require("./appError");
const catchAsync = require("./catchAsync");
const uploadToS3 = require("../utils/uploadToS3"); // Adjust the path

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find();

    return res.status(200).json({
      status: "success",
      data,
    });
  });

  exports.createWithImages = (Model) =>
    catchAsync(async (req, res, next) => {
      const { teacherId, className, students: studentData } = req.parsedData || {};
  
      if (!teacherId || !className) {
        return next(new AppError("Both teacher ID and class name are required", 400));
      }
  
      const classroom = await Model.create({
        name: className,
        teacher: teacherId,
        students: [],
      });
  
      const studentCreationPromises = studentData.map(async (student, index) => {
        if (!student?.name) {
          throw new AppError(`Student ${index + 1} is missing a name`, 400);
        }
  
        if (!student?.imageFile) {
          throw new AppError(`Student ${index + 1} is missing an image`, 400);
        }
  
        const imageUrl = await uploadToS3(student.imageFile.buffer, student.imageFile.mimetype);
  
        const createdUser = await User.create({
          name: student.name,
          image: imageUrl,
        });
  
        return createdUser;
      });
  
      const createdStudents = await Promise.all(studentCreationPromises);
  
      classroom.students = createdStudents.map((s) => s._id);
      await classroom.save();
  
      const populatedClassroom = await Model.findById(classroom._id)
        .populate('teacher')
        .populate('students');
  
      res.status(201).json({
        status: 'success',
        data: {
          classroom: populatedClassroom,
        },
      });
    });
  
  exports.getClassroomsByTeacherId = (Model) =>
    catchAsync(async (req, res, next) => {
      const teacherId = req.params.teacherId;
  
      if (!teacherId) {
        return res.status(400).json({
          status: "fail",
          message: "Teacher ID is required",
        });
      }
  
      const data = await Model.find({ teacher: teacherId });
  
      return res.status(200).json({
        status: "success",
        data,
      });
    });
  
  

  const User = require("../models/userModel");
  


  exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
      if (Model.modelName === "Classroom") {
        const { name, teacher, students } = req.body;
  
        const classroom = await Model.create({ name, teacher });
      
        const studentIds = await Promise.all(
          students.map(async (student) => {
            const imageUrl = await uploadToS3(student.image); 
            
            const newUser = await User.create({
              name: student.name,
              image: imageUrl,
              classroom: classroom._id,
            });
  
            return newUser._id;
          })
        );
  
        classroom.students = studentIds;
        await classroom.save();
  
        return res.status(201).json({
          status: "success",
          data: classroom,
        });
      }
  
      const data = await Model.create(req.body);
      return res.status(201).json({
        status: "success",
        data,
      });
    });
  
    
    
exports.deleteAllTeachers = (Model) => catchAsync(async (req,res,next)=> {
      await Model.deleteMany(); 

      res.status(204).json({
        status: 'success',
        message: 'Todos os professores foram deletados com sucesso.',
        data: null
      });

})

exports.deleteAllClasses = (Model) =>
  catchAsync(async (req,res,next)=> {
    await Model.deleteMany(); 

    res.status(204).json({
      status: 'success',
      message: 'Todas as salas foram removidas com sucesso.',
      data: null
    });
  })
  

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data)
      return new AppError(404, "Cannot find any document with that ID!");

    return res.status(200).json({
      status: "success",
      data,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    return res.status(204).json({
      status: "success",
      data: null,
    });
  });
