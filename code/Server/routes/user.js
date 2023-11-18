import express from 'express';
import insertUser from '../controllers/user/insertUser.js';
import setData from '../controllers/user/setData.js'
import fetchStudents from '../controllers/user/fetchStudents.js'
import fetchUserDetails from '../controllers/user/fetchUserDetails.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/login', insertUser)
router.post('/setdata', setData)
router.get('/student', fetchStudents)
router.get('/user/:id', fetchUserDetails)

export default router