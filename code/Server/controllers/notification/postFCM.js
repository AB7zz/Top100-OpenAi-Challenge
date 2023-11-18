const postFCM = async(req, res) => {
    try{
        sessionStorage.setItem('fcm', req.body.fcm)
        res.status(200)
    }catch(error){
        console.log(error)
    }
}

export default postFCM