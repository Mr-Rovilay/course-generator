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
            {text: "generate a course tutorial on following detail with field course name, description, along with chapter name, about, duration: category: programming, topic: phyton ,  level: basic duration: 1 hour, noOfChapter: 5 in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"name\": \"Python Programming Fundamentals\",\n    \"description\": \"This course provides a comprehensive introduction to Python programming, covering the basics of syntax, data types, operators, control flow, functions, and more. By the end of this course, you will be able to write simple Python programs and understand the fundamental concepts of programming.\",\n    \"category\": \"Programming\",\n    \"topic\": \"Python\",\n    \"level\": \"Basic\",\n    \"duration\": \"1 hour\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to Python\",\n        \"about\": \"This chapter introduces the Python programming language, its history, applications, and how to set up your development environment.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Variables and Data Types\",\n        \"about\": \"This chapter covers the fundamental concepts of variables, data types (integers, floats, strings, booleans), and how to manipulate them in Python.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Operators and Expressions\",\n        \"about\": \"This chapter delves into arithmetic, comparison, logical, and assignment operators, along with how to build complex expressions in Python.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Control Flow Statements\",\n        \"about\": \"This chapter introduces the core control flow statements: conditional statements (if, elif, else) and loops (for, while).\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Functions and Modules\",\n        \"about\": \"This chapter explains how to define and call functions to organize code and create reusable blocks of logic. It also covers modules and how to use pre-built libraries.\",\n        \"duration\": \"15 minutes\"\n      }\n    ]\n  }\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  