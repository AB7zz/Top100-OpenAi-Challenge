import React, { useState } from 'react';
import bg from '../../assets/bg.png'
// import logo from '../../assets/logo.png'
import Otpbox from '../../components/Otp/Otpbox'
import { IoMdArrowRoundBack } from 'react-icons/io';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useStateContext} from '../../context/StateContext'
// import { PhoneNumber } from 'react-phone-number-input';

function Otp({ handleLoginchange,PhoneNumber }) {
  const [otp, setOtp] = useState(0);
  const {userDetails, fetchUserDetails} = useStateContext()
  const navigate = useNavigate()

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleOtpVerification = () => {
    window.confirmationResult.confirm(otp).then((result) => {
      const user = result.user
      console.log('logged in successfully', user)

      user.getIdTokenResult().then(async(tokenResult) => {
        const { token } = tokenResult
        const accessToken = token
        // setLoading(false)
        localStorage.setItem('accessToken', accessToken)
        const refreshToken = tokenResult.token
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('phone', `${PhoneNumber}`)
        localStorage.setItem('uid', user.uid)
        const result = await axios.post('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/login', {uid: user.uid, phone: PhoneNumber}, {
          headers: {
            Authorization: localStorage.getItem('accessToken')
          }
        })
        if(result.data.exists){
          fetchUserDetails()
          if(userDetails){
            const messageData = { 
              type: 'auth',
              loggedIn: 'true',
              userType: userDetails.type == 0 ? 'university' : userDetails.type == 1 ? 'teacher' : 'student'
            };
            window.postMessage(JSON.stringify(messageData), '*');
          }
          window.location.replace('/home')
        }else{
          window.location.replace('/setdata')
        }
      }).catch(async(error) => {
        // localStorage.setItem('uid', 'f1NCt75UbqUdNurmw1fcc40RJTR2')
        // const result = await axios.post('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/login', {uid: user.uid, phone: PhoneNumber})
        // if(result.data.exists){
        //   window.location.replace('/home')
        // }else{
        //   window.location.replace('/setdata')
        // }
        console.log(error)
        // setLoading(false)
        // setError({ message: 'Sorry, the OTP you entered is incorrect. Please double-check the code and try again.', active: true })
        console.log('No access token')
      })
    }).catch((error) => {
      console.log(error)
      // setLoading(false)
      // setError({ message: 'Sorry, the OTP you entered is incorrect. Please double-check the code and try again.', active: true })
      console.log('user couldnt sign in')
    })
  };
  const isOtpFilled = true;

  return (
    <div>
      <div className='flex justify-center items-center flex-col'>
        <div className="relative">
          <img src={bg} alt="background" />
          
        </div>

        <div className='relative h-screen/2 w-screen bg-white flex flex-col justify-center items-center'>
          <div className='!mr-[20rem] !mt-3'>
            <IoMdArrowRoundBack size={40}  />
          </div>
          <div className='flex flex-col items-center justify-center gap-y-3'>
            <h1 className='font-bold text-2xl text-teal-500 '>Enter OTP</h1>
            <p>We have send an OTP to your mobile number</p>
          </div>
          <div className='mt-[2rem]'>
            <Otpbox otp={otp} handleOtpChange={handleOtpChange} />
          </div>
          <div className='mt-[3rem]'>
            <button
              className='h-[52px] w-[335px] rounded-lg font-bold font-inter bg-teal-500  text-white'
              onClick={handleOtpVerification}
            >
              Sign In
            </button>

            <div className="mt-5 flex flex-col justify-center items-center">
              <p className="text-gray-600 inline">Did'nt recieve the otp?</p>
              <p className="text-green-600 inline">Resend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default Otp;