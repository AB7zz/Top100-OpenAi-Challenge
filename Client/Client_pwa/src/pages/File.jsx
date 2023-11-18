import React, { useState } from 'react';
import ConvertApi from 'convertapi-js';
import axios from 'axios'

const File = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const convertFile = async () => {
    if (file) {
      try {
        const convertApi = ConvertApi.auth('lV8TdrWKiknX5AeC');
        const params = convertApi.createParams();
        params.add('File', file);

        const result = await convertApi.convert('pdf', 'txt', params);
        console.log(result.dto.Files[0].Url)
        const response = await axios.post('https://eduu-server-dfd0c081bcc6.herokuapp.com/api/pdf', {url: result.dto.Files[0].Url}, {
          headers: {
            Authorization: localStorage.getItem('accessToken')
          }
        })
        if(response){
            // redirect to another page
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
      <h1>File Converter</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={convertFile}>Convert</button>
      {convertedText && (
        <div>
          <h2>Converted Text:</h2>
          <pre>{convertedText}</pre>
        </div>
      )}
    </div>
  );
};

export default File