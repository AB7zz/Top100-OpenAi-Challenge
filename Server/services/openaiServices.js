const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function callOpenAI(pdfData,type) {
  try {

    let prompt;

    if(type==1){
     prompt = ` ${pdfData} generate me 10 questions based on this with options and also the correct answer in json format.
    only give the question as response no other explanation or anything needed , just what i asked for , make it array of jsons`
    }
    else if(type==2){
     prompt = ` ${pdfData} generate me 10 true or false question based on this data , only the questions and correct answer , 
    no other explanation or anything needed , only what i asked for in array of jsons format`
    }
    else{
        prompt = `${pdfData} generate me 10 true or false  and multiple choice  question based on this data , only the questions and correct answer  and options if its a multiple choice , no other explanation or anything needed , only what i asked for in array of jsons format 
       .  add type 1 for multiple choice and 2 for true or false`
    }


    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens:2048 ,
      temperature: 0,
      // stream: true
    });

    const output = response.data.choices[0].text.trim()
    return output;
  } catch (error) {
    console.error('Error in calling OpenAI API:', error.message);
    throw new Error('Failed to call OpenAI API');
  }
}

module.exports = {
    callOpenAI
  };