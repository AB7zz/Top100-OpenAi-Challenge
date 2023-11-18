import {callOpenAI} from '../../services/openaiServices.js'


const generateQuestion = async (pdfData,type) => {
    try{
        // const {pdfData,type} = req.body
        // const pdfData ="Although tree ferns account for only a small percentage of ferns, many are conspicuous members of a forest, attaining heights of 7 to 10 metres (23 to 33 feet); some are 15, 18, or occasionally 24 metres tall (49, 59, or 79 feet). These graceful trees, which are natives of humid montane forests in the tropics and subtropics and of warm temperate regions of the Southern Hemisphere, have huge lacy leaves; they are the remnants of a vastly more numerous flora that populated much of Earth during the Carboniferous Period (about 358.9 to 298.9 million years ago)."
        // const type = 1;
        const questions = await callOpenAI(pdfData,type)
        console.log(questions)
        return questions;
    }
    catch{
        console.log("Error in generating question")
    }

}

export default generateQuestion