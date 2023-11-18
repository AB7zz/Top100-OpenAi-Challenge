import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const fetchStudents = async (req, res) => {
    try {
        const studentRef = db.collection('users');
        const studentGet = await studentRef.get();
        const students = [];
        studentGet.forEach(doc => {
            students.push(doc.data());
        });
        res.json({ students });
    } catch (error) {
        console.log(error);
    }
}
export default fetchStudents;