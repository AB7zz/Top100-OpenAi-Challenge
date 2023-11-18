import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const fetchTests = async(req, res) => {
    try {
        const testRef = db.collection('tests');
        const testGet = await testRef.get();
        const tests = [];
        testGet.forEach(doc => {
            tests.push(doc.data())
        })
        res.json({tests})        
    } catch (error) {
        console.log(error)
    }
}

export default fetchTests