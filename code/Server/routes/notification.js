import express from 'express';
import postFCM from '../controllers/notification/postFCM.js';
import triggerNoti from '../controllers/notification/triggerNoti.js';
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/notification', postFCM)
router.post('/trigger', triggerNoti)

export default router