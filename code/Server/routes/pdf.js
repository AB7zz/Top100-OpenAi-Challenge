import express from 'express';
import parsePDF from '../controllers/PDF/parsePDF.js';
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/pdf', parsePDF)

export default router