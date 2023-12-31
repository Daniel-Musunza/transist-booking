const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getkcsevideos = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM kcsevideos';
  const kcsevideos = await db.query(query);
  res.status(200).json(kcsevideos);
});

const addkcsevideo = async (req, res) => {
  try {
    const {
      subject_id,
      kcse_year,
      question_no,
      paper,
      chapter_id,
      question,
      video,
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
    } = req.body;

    if (!subject_id || !video) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }
    let answerFile = null;
    if(req.file){
      return answerFile = req.file.filename; 
      // Access the uploaded file via multer
    }
   

    // Insert the file data into the database
    const insertKcseVideoQuery = `
      INSERT INTO kcsevideos (
        subject_id,
        chapter_id,
        kcse_year,
        question_no,
        paper,
        question,
        answerFile,
        correctAnswer,
        answerA,
        answerB,
        answerC,
        answerD,
        video
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const result = await db.query(insertKcseVideoQuery, [
      subject_id,
      chapter_id,
      kcse_year,
      question_no,
      paper,
      question,
      answerFile, // Use answerFile.filename to store the filename
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
      video
    ]);

    const newKcseVideo = {
      id: result.insertId,
      subject_id,
      chapter_id,
      kcse_year,
      question_no,
      paper,
      question,
      answerFile: answerFile, // Store the filename as a reference
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
      video
    };

    res.status(200).json(newKcseVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const editkcsevideo = async (req, res) => {
  try {
    const { id } = req.params;
    

    const { 
      kcse_year,
      question_no,
      paper,
      question,
      video,
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
     } = req.body;

    const findKcseVideoQuery = 'SELECT * FROM kcsevideos WHERE id = ?';
    const kcsevideo = await db.query(findKcseVideoQuery, [id]);

    if (kcsevideo.length === 0) {
      
      return res.status(404).json({ message: 'Kcse Video not found' });
     
    }

    let answerFile = null;
    if (req.file) {
      answerFile = req.file.filename; 
      // Access the uploaded file via multer
    }

    // Update the file data in the database
    const updateKcseVideoQuery = `
      UPDATE kcsevideos 
      SET 
        kcse_year = ?,
        question_no = ?,
        paper = ?,
        question = ?,
        answerFile = ?,
        correctAnswer = ?,
        answerA = ?,
        answerB = ?,
        answerC = ?,
        answerD = ?,
        video = ?
      WHERE id = ?
    `;

    
    await db.query(updateKcseVideoQuery, [
      kcse_year,
      question_no,
      paper,
      question,
      answerFile,
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
      video,
      id
    ]);

    res.json({
       id, 
       kcse_year,
       question_no,
       paper,
       question,
       video,
       correctAnswer,
       answerFile: answerFile,
       answerA,
       answerB,
       answerC,
       answerD,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getkcsevideos,
  addkcsevideo,
  editkcsevideo
};
