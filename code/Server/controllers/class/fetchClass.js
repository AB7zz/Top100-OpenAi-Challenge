import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const fetchClass = async(req, res) => {
    try {
        const classRef = db.collection('classes');
        const classGet = await classRef.get();
        const classes = [];
        classGet.forEach(doc => {
            classes.push(doc.id)
        })
        res.json({classes})        
    } catch (error) {
        console.log(error)
    }
}

export default fetchClass