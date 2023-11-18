import axios from 'axios'
import generateQuestion from '../question/generateQuestion.js'
import dotenv from 'dotenv'
import ConvertAPI from 'convertapi';
import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const convertapi = new ConvertAPI(process.env.CONVERT_API_SECRET);

dotenv.config()

const parsePDF = async (req, res) => {
    try {
        const response = await axios.get(
            req.body.url
        );

        const testRef = db.collection('tests').doc(req.body.testName.replace(/\s/g, '').toLowerCase());
        
        const textContent = response.data;
        
        const questions = await generateQuestion(textContent, req.body.questionType)
        
        await testRef.set({testName: req.body.testName, testDesc: req.body.testDesc, questions: JSON.parse(questions), className: req.body.className})

        res.status(200).json({questions})
    } catch (error){
        console.log(error)
    }
}

export default parsePDF