import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const fetchQuestion = async(req, res) => {
    try {
        const testRef = db.collection('tests').doc(req.params.id);
        const doc = await testRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            res.status(200).json({questions: doc.data().questions, className: doc.data().className})
        }
    } catch (error) {
        console.log(error)
    }
}

export default fetchQuestion