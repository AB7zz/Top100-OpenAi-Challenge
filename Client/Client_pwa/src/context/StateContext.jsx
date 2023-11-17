import React from 'react'
import axios from 'axios'

const StateContext = React.createContext()

export const StateContextProvider = ({ children }) => {
    const [classes, setClasses] = React.useState([])
    const [students, setStudents] = React.useState([])
    const [tests, setTests] = React.useState([])
    const [userDetails, setUserDetails] = React.useState({})
    
    const fetchClasses = async () => {
        try{
            const response = await axios.get('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/class')
            setClasses(response.data.classes)
            console.log(response.data.classes)
        }catch(error){
            console.log(error)
        }
    }
    const fetchStudents = async () => {
        try{
            const response = await axios.get('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/student')
            setStudents(response.data.students)
            console.log(response.data.students)
        }catch(error){
            console.log(error)
        }
    }
    const fetchUserDetails = async() => {
      try {
        if(localStorage.getItem('uid') !== null || localStorage.getItem('uid') !== ''){
          const response = await axios.get(`https://eduu-server-dfd0c081bcc6.herokuapp.com/api/user/${localStorage.getItem('uid')}`)
          setUserDetails(response.data.user)
          console.log(response.data.user)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchTests = async() => {
      try {
        const response = await axios.get('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/test')
        setTests(response.data.tests)
        console.log(response.data.tests)
      } catch (error) {
        console.log(error)
      }
    }
    React.useEffect(() => {
      fetchClasses()
      fetchStudents()
      fetchTests()
      fetchUserDetails()
    }, [])
  return (
    <StateContext.Provider value={{
      classes,
      students,
      userDetails,
      tests,
      fetchUserDetails
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => React.useContext(StateContext)
