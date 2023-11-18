// Progress.jsx
import React, { useEffect,useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useStateContext } from '../../context/StateContext';
import html2canvas from 'html2canvas';
import emailjs from '@emailjs/browser';

ChartJS.register(ArcElement, Tooltip, Legend);
let gradeArray = [0, 0, 0, 0, 0];
emailjs.init('63EkXHr_zHJVHSj20')


function ProgressChart() {

    let id = useParams()
    let MyId = id.id.toUpperCase()
    const [weakestTopic, setWeakestTopic] = useState('')
    const [classname, setClassname] = useState('')
    const {students} = useStateContext() // Initializing counts for grades A, B, C, D, E

useEffect(() => {
  console.log("students", students);
  let stud

  students.forEach((student) => {
    const test1Points = student.points[id.id];

    // Implement your grading logic here
    let grade;
    if(student.type ==2)
    {
      if (test1Points >= 8) {
        grade = "A";
        gradeArray[0]++;
      } else if (test1Points >= 7) {
        grade = "B";
        gradeArray[1]++;
      } else if (test1Points >= 6) {
        grade = "C";
        gradeArray[2]++;
      } else if (test1Points >= 4) {
        grade = "D";
        gradeArray[3]++;
      } else {
        grade = "E";
        gradeArray[4]++;
      }
      console.log(`${student.name}'s grade for test1: ${grade}`);
    }

    // Log the grade for each student
  });

  // Log the grade distribution
  console.log("Grade distribution:", gradeArray);
}, [students]);



    console.log("gradearray",gradeArray)
    // console.log("students",students)
    useEffect(() => {
      const fetchClassName = async () => {
        console.log("idddddd",id.id)
        const response = await axios.get(`https://eduu-server-dfd0c081bcc6.herokuapp.com/api/question/${id.id}`);
        console.log("responseeeeeee",response)
        setClassname(response.data.className)
        console.log("firstclasnameeeeee",classname)
      }
      fetchClassName()
    }, [classname])
    const handleWeakest = async() => {
      try {
        console.log("clasnameeeeee",classname)
        const res = await axios.get(`https://eduu-server-dfd0c081bcc6.herokuapp.com/api/weakesttopic/${classname}/${id.id}`)
        if(res){
          console.log("response weak",res)
          setWeakestTopic(res.data.weakestTopic)
          // const res2 = await axios.post('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/trigger', {url: res.data.url, weakestTopic: res.data.weakestTopic})
        }
      } catch (error) {
        console.log(error)
      }
    }
    console.log("weaktopiccc",weakestTopic)
    const data = {
      labels: ['10-9', '9-8', '8-7', '6-5','Fail'],
      datasets: [
        {
          label: '# of Votes',
          data: [gradeArray[0], gradeArray[1], gradeArray[2], gradeArray[3], gradeArray[4]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    let globalScreenshotUrl; // Define a global variable

    const takeScreenshot = () => {
      const chartElement = document.getElementById('pie-chart');
      if (chartElement) {
        html2canvas(chartElement).then((canvas) => {
          globalScreenshotUrl = canvas.toDataURL('image/png');
          // console.log('Screenshot URL:', globalScreenshotUrl);
          // You can choose to do something else with the URL, e.g., save it in state
        });
      }
    };

    const sendResources =async()=>{
      let inemail = "i.dheerajdileep@gmail.com"
      takeScreenshot()
      // console.log("scscscs",globalScreenshotUrl)
      await emailjs.send("service_j73s3ya","template_ilvk4ct",{
        content: globalScreenshotUrl,
        toEmail: inemail,
        },"63EkXHr_zHJVHSj20")
        .then((result) => {
          console.log(result);
        }, (error) => {
          console.log(error);
        });


    }

    // console.log("first",id)
  return (
    <div className='p-10 flex justify-center items-center flex-col'>
     <h1 className='text-3xl font-bold pb-10'> Test: {MyId}</h1>
      <div id='pie-chart'>
        <Pie data={data} className='' />
      </div>
      <div className='pt-8 text-semibold text-xl border-2 bg-gray-100 p-5 mt-7 rounded-xl'>
        <div>
            <h1 className='font-bold py-3'> Weakest area of students</h1>
            <h2 className='text-teal-500 font-semibold'> {weakestTopic}</h2>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mt-6 gap-5 w-full'>    
        <button onClick={handleWeakest} className='bg-teal-500 rounded-lg text-white p-3 w-full '>
            <h1 className='font-bold py-3 '>View weak topic of the class</h1>
        </button>
        <button className='bg-teal-500 rounded-lg text-white p-3 w-full' onClick={sendResources}>
            <h1 className='font-bold py-3'>Send resources </h1>
        </button>
      </div>
    </div>
  );
}

export default ProgressChart;
