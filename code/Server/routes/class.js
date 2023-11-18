import express from 'express';
import fetchClass from '../controllers/class/fetchClass.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.get('/class', fetchClass)

export default router