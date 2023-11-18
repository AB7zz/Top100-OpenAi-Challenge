import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const insertUser = async(req, res) => {
    try {
        const phone = req.body.phone
        const userRef = db.collection('users').doc(req.body.uid);
        const userGet = await userRef.get();
        if(userGet.data()){
            res.json({exists: 1, message: "User already exists"})
        }else{
            await userRef.set({
                name: '',
                type: 0, // 0 for uni, 1 for teacher, 2 for student
                phone: req.body.phone,
                class: '',
                points: {}
            })
            res.json({exists: 0, message: "User created"})
        }
    } catch (error) {
        console.log(error)
    }
}

export default insertUser