/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  ;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
 history: [
  {
    role: "user",
    parts: [
      {text: "Generate A Course Tutorial on Following Details with Fields as Course Name, Description, Along With Chapter Name, about, Duration: Category: \"Programming\", Topic: Python Level: Basic, Duration: 1 hours NoOf Chapters: 4, in JSON format"},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "```json\n{\n  \"courseName\": \"Python Programming Basics\",\n  \"description\": \"This course is a beginner-friendly introduction to Python programming. We'll cover the fundamentals of the language, including data types, variables, operators, control flow, and functions. By the end of this course, you'll have a solid understanding of Python and be able to write basic programs.\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Introduction to Python\",\n      \"about\": \"This chapter will introduce you to the Python programming language, its history, uses, and why it's a great language to learn. We'll also set up your development environment and write your first Python program.\",\n      \"duration\": \"30 minutes\"\n    },\n    {\n      \"chapterName\": \"Data Types and Variables\",\n      \"about\": \"This chapter will cover the fundamental data types in Python, including integers, floats, strings, and booleans. We'll also learn how to define and use variables to store data in your programs.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Operators and Control Flow\",\n      \"about\": \"This chapter will explore various operators in Python, including arithmetic, comparison, and logical operators. We'll also learn about control flow structures like if-else statements and loops to make your programs more dynamic.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Functions\",\n      \"about\": \"This chapter introduces the concept of functions in Python, explaining how to define, call, and use them to organize and reuse code. We'll also discuss passing arguments and returning values from functions.\",\n      \"duration\": \"15 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"noOfChapters\": 4\n}\n``` \n"},
    ],
  },
],
});
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  