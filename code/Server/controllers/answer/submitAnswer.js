import admin from '../../config/firebase-config.js'
import {getFirestore} from 'firebase-admin/firestore'

const db = getFirestore();

const submitAnswer = async (req, res) => {
    try {
        const { uid, testId, points } = req.body;
        const studentRef = db.collection('users').doc(uid);
        const studentGet = await studentRef.get();
        const studentData = studentGet.data();
        // const classRef = db.collection('classes').doc(classId);
        // const classGet = await classRef.get();
        // const classData = classGet.data();

        let allPoints
        if(studentData.points) {
            allPoints = {...studentData.points, [testId]: points}
        }else{
            allPoints = {[testId]: points}
        }

        // if(classData.points) {
        //     allPoints = {...classData.points, [testId]: (classData.points.testId || 0) + points}
        // }
        // else{
        //     allPoints = {[testId]: points}
        // }

        // await classRef.update({points: allPoints})
        await studentRef.update({points: allPoints})
    } catch (error) {
        console.log(error)
    }
}

export default submitAnswer