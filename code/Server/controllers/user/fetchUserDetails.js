import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const fetchUserDetails = async(req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const doc = await userRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            res.status(200).json({user: doc.data()})
        }
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails