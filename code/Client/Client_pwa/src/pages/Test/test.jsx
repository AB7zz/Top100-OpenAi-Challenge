import React, { useState } from "react";
import axios from 'axios'
import ConvertApi from 'convertapi-js';
import { useStateContext } from "../../context/StateContext";

export default function Test() {
  const {classes} = useStateContext()
  const [testName, setTestName] = useState("");
  const [testDesc, setTestDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [className, setClassName] = useState("");
  const [questionType, setQuestionType] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected File:", file);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        const convertApi = ConvertApi.auth('lV8TdrWKiknX5AeC');
        const params = convertApi.createParams();
        params.add('File', selectedFile);

        const result = await convertApi.convert('pdf', 'txt', params);
        console.log(result.dto.Files[0].Url)
        const response = await axios.post('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/pdf', {url: result.dto.Files[0].Url, testName, testDesc, className, questionType}, {
          headers: {
            Authorization: localStorage.getItem('accessToken')
          }
        })
        if(response){
            console.log(response)
            window.location.replace('/home')
        }
      } catch (error) {
        console.error('Error converting file:', error);
      }
    } else {
      console.warn('Please select a file first.');
    }
    
  };

  return (
    <div>
      <p className="font-bold text-5xl text-teal-500 text-center mt-10">
        Test Details
      </p>
      <form
        className="border border-teal-500 mt-14 w-[22rem] ml-4 h-[42rem]"
        onSubmit={handleSubmit}
      >
        <h3 className="font-bold text-2xl text-teal-500 ml-5 mt-3">Test Name</h3>
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="relative h-[3rem] w-[20rem] p-6 ml-2 mt-5 bg-gray-200 te flex flex-col justify-center items-center rounded-xl"
          placeholder="name"
        />
        <h3 className="font-bold text-2xl text-teal-500 ml-5 mt-3">Test Desc</h3>
        <input
          type="text"
          value={testDesc}
          onChange={(e) => setTestDesc(e.target.value)}
          className="relative h-[3rem] w-[20rem] p-6 ml-2 mt-5 bg-gray-200 te flex flex-col justify-center items-center rounded-xl"
          placeholder="desc"
        />
        <h3 className="font-bold text-2xl text-teal-500 ml-5">Upload PDF</h3>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="relative h-[3rem] w-[20rem] p-3 ml-2 mt-5 bg-gray-200 te flex flex-col justify-center  rounded-xl"
            id="pdfFileInput"
          />
        </div>
        <h3 className="font-bold text-2xl text-teal-500 mt-4 ml-5">Class Name</h3>
        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="relative h-[3rem] w-[20rem] p-6 ml-2 mt-5 bg-gray-200 te flex flex-col justify-center items-center rounded-xl"
        >
          <option>Select Class</option>
          {classes && classes.map((cls) => (
            <option value={cls}>{cls}</option>
          ))
          }
          
        </select>

        <h3 className="font-bold text-2xl text-teal-500 mt-4 ml-5">Type Of Question</h3>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="relative h-[3rem] w-[20rem] p-6 ml-2 mt-5 bg-gray-200 te flex flex-col justify-center items-center rounded-xl"
        >
          <option></option>
          <option>Yes/No</option>
          <option>MCQ</option>
          <option>Short Answer</option>
          <option>Essay</option>
          <option>Computational</option>
        </select>
        <button
          type="submit"
          className="relative h-[3rem] w-[14rem] p-6 ml-11 mt-[2.5rem] flex flex-col justify-center items-center rounded-xl bg-teal-500  text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
