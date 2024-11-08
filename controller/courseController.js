const chapter = require('../db/models/chapter');
const course = require('../db/models/course');
const subject = require('../db/models/subject');
const subtopic = require('../db/models/subtopic');
const catchAsync = require('../utils/catchAsync');

const courseName = catchAsync(async(req,res,next) => {

  const body = req.body;

    const newCourse = await course.create({ 
      course : body.course
    });

    if(!newCourse)
    {
      return next(new AppError('Failed to create the course',400));
    }
    
    return res.status(201).json({
      status : 'success',
      data : newCourse,
    });
});

const subjectName = catchAsync(async(req,res,next) => {

  const body = req.body;

    const newSubject = await subject.create ({
        courseNameID : body.courseNameID,
        subject : body.subject
    });
    
    if(!newSubject)
      {
        return next(new AppError('Failed to create the subject',400));
      }
  
    return res.status(201).json({
      status : 'success',
      data : newSubject
    });
});


const chapterName = catchAsync(async(req,res,next) => {

  const body = req.body;

    const newChapter = await chapter.create ({
        subjectID : body.subjectID,
        title : body.title
    });
    
    if(!newChapter)
      {
        return next(new AppError('Failed to create the chapter',400));
      }
  
    return res.status(201).json({
      status : 'success',
      data : newChapter
    });
});

const subtopicName = catchAsync(async(req,res,next) => {

  const body = req.body;
  const url = body.videoid
  const VideoID = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

    const newSubtopic = await subtopic.create ({
        chapterID : body.chapterID,
        subtopic : body.subtopic,
        videoid : VideoID[1]
    });
    
    if(!newSubtopic)
      {
        return next(new AppError('Failed to create the chapter',400));
      }
  
    return res.status(201).json({
      status : 'success',
      data : newSubtopic
    });
});

const getPhysicsContent = catchAsync(async(req,res,next) => {

  const result = await chapter.findAll({ where : { subjectID : 1}});
  
    // return res.json({result});

    return res.status(200).json({
      status : 'success',
      content : result,
    });

});

const getBiologyContent = catchAsync(async(req,res,next) => {

  const result = await chapter.findAll({ where : { subjectID : 3}});
  
    // return res.json({result});

    return res.status(200).json({
      status : 'success',
      content : result,
    });

});

const getChemistryContent = catchAsync(async(req,res,next) => {

  const result = await chapter.findAll({ where : { subjectID : 2}});
  
    // return res.json({result});

    return res.status(200).json({
      status : 'success',
      content : result,
    });

});

const getMathematicsContent = catchAsync(async(req,res,next) => {

  const result = await chapter.findAll({ where : { subjectID : 4}});
  
    // return res.json({result});

    return res.status(200).json({
      status : 'success',
      content : result,
    });

});

const getChapterSubtopic = catchAsync(async(req,res,next)=>{

  const {id} = req.body

  const result = await subtopic.findAll({where : { chapterID : id}});

  return res.status(200).json({
    status:"success",
    content : result,
  });
})

module.exports = {courseName,subjectName,chapterName,subtopicName,getPhysicsContent,getChemistryContent,getMathematicsContent,getBiologyContent,getChapterSubtopic}