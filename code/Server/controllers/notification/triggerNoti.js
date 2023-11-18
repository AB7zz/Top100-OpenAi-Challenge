import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const triggerNoti = async(req, res) => {
    try{
        console.log(req.body.url)
        const res = await axios.post('https://fcm.googleapis.com/fcm/send', {
            to:"coSetLAATdemdZGf1uo5wd:APA91bEB6gb7jYO8hBvz_3C3qe2N3g-3LqnQ-Bb1Iqi-9VrLMXdFN0edLDV4t5qAd4rauBRJ34HgyzyanmG1RHqT2odUpnqsLTypkFUK3j7AZfm4hhslx0-BM1XqvZ7KpRq9iMi9FAon",
            priortiy: "high",
            data: {
                TITLE: `Study Material`,
                MESSAGE: `Watch this youtube video to understand more about ${req.body.weakestTopic}: ${req.body.url}`,
                TAG: "Weakest Topic"
            }
        }, {
            headers:{
                Authorization: `key=${process.env.NOTI_SERVER_KEY}`
            }
        })
        return res.send({message: "Notification sent"})
    }catch(error){
        console.log(error)
    }
}

export default triggerNoti