import {getWeakestTopic} from '../../services/openaiServices.js'
import fetchURL from '../notification/fetchURL.js';
import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const weakestTopic = async(req, res) => {
    try {
        const className  = req.params.classid;
        const testName = req.params.testid
        const classRef = db.collection('classes').doc(className);
        const classGet = await classRef.get();
        const classData = classGet.data();
        const wrongquestions = classData.wrongquestions;
        const weakestTopic = await getWeakestTopic(wrongquestions);
        const url = await fetchURL(weakestTopic);
        console.log(url)
        res.json({weakestTopic, url})
    }catch(error){
        console.log(error)
    }
}

export default weakestTopic