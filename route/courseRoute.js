const { authentication } = require('../controller/authController');
const { courseName, subjectName, chapterName, subtopicName, getPhysicsContent,getChemistryContent,getBiologyContent,getMathematicsContent,getChapterSubtopic } = require('../controller/courseController');

const router = require('express').Router();

router.route('/courseName').post(authentication,courseName);
router.route('/subjectName').post(subjectName);
router.route('/chapterName').post(chapterName);
router.route('/subtopicName').post(subtopicName);
router.route('/getPhysicsContent').get(getPhysicsContent);
router.route('/getChemistryContent').get(getChemistryContent);
router.route('/getBiologyContent').get(getBiologyContent);
router.route('/getMathematicsContent').get(getMathematicsContent);
router.route('/getChapterSubtopic').post(getChapterSubtopic);

module.exports = router;