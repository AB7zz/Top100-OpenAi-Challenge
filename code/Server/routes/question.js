import express from 'express';
import generateQuestion from '../controllers/question/generateQuestion.js'
import fetchQuestion from '../controllers/question/fetchQuestion.js'
import fetchTests from '../controllers/question/fetchTests.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.get('/question', generateQuestion)
router.get('/question/:id', fetchQuestion)
router.get('/test', fetchTests)

export default router