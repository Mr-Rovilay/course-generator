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

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: "Explain the concept in Details on Topic: node, Chapter:Asynchronous Programming in JSON Format with list of array with field as title, description in detail, code example(Code field in <precode> format) if applicable"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "## Asynchronous Programming in Node.js: A Detailed Explanation in JSON Format\n\nThis document explains the concept of asynchronous programming in Node.js, a fundamental aspect of the platform that enables its efficient and non-blocking nature. \n\n**JSON Format:**\n\n```json\n{\n  \"title\": \"Asynchronous Programming in Node.js\",\n  \"description\": \"Node.js thrives on asynchronous operations. This enables the server to handle multiple requests concurrently without blocking, leading to better performance and responsiveness.\",\n  \"details\": [\n    {\n      \"title\": \"Understanding Asynchronous Operations\",\n      \"description\": \"Asynchronous operations allow Node.js to execute tasks without waiting for them to finish. Instead of blocking the main thread, Node.js registers a callback function that is executed once the operation is complete. This allows the server to continue processing other requests while the asynchronous operation runs in the background.\",\n      \"code_example\": \"<precode>\\n// Asynchronous operation (e.g., reading a file)\\nfs.readFile('myfile.txt', 'utf8', (err, data) => {\\n  if (err) {\\n    console.error(err);\\n  } else {\\n    console.log(data);\\n  }\\n});\\n\\n// Other operations can continue executing while readFile is running\\nconsole.log('This message will be printed before the file content.');\\n</precode>\"\n    },\n    {\n      \"title\": \"Event Loop and Callbacks\",\n      \"description\": \"The heart of Node.js's asynchronous nature is the Event Loop. It continuously checks for pending tasks and executes them as they become available. When an asynchronous operation completes, it triggers a callback function registered with the operation. This callback is then placed in the Event Loop queue and executed when the main thread is available.\",\n      \"code_example\": \"<precode>\\n// Example using setTimeout (a timer-based asynchronous function)\\nsetTimeout(() => {\\n  console.log('This message will be printed after 2 seconds');\\n}, 2000);\\n\\nconsole.log('This message will be printed immediately.');\\n</precode>\"\n    },\n    {\n      \"title\": \"Promises and Async/Await\",\n      \"description\": \"Promises and the async/await syntax provide a more structured and cleaner way to handle asynchronous operations. Promises represent the eventual result of an asynchronous operation, while async/await allows you to write asynchronous code that looks like synchronous code.\",\n      \"code_example\": \"<precode>\\n// Using Promises\\nconst fs = require('fs').promises;\\n\\nfs.readFile('myfile.txt', 'utf8').then(data => {\\n  console.log(data);\\n}).catch(err => {\\n  console.error(err);\\n});\\n\\n// Using async/await\\nasync function readAndPrintFile() {\\n  try {\\n    const data = await fs.readFile('myfile.txt', 'utf8');\\n    console.log(data);\\n  } catch (err) {\\n    console.error(err);\\n  }\\n}\\n\\nreadAndPrintFile();\\n</precode>\"\n    },\n    {\n      \"title\": \"Benefits of Asynchronous Programming\",\n      \"description\": \"Asynchronous programming brings significant advantages in Node.js:\",\n      \"details\": [\n        {\n          \"title\": \"Improved Performance and Responsiveness\",\n          \"description\": \"By handling requests concurrently, Node.js can serve multiple users efficiently without blocking. This leads to a faster and more responsive application.\"\n        },\n        {\n          \"title\": \"Efficient Resource Utilization\",\n          \"description\": \"Asynchronous operations allow Node.js to utilize resources efficiently. The server can handle multiple tasks simultaneously without wasting time waiting for long-running operations to complete.\"\n        },\n        {\n          \"title\": \"Scalability\",\n          \"description\": \"Asynchronous programming makes Node.js highly scalable. It can handle a large number of concurrent connections without performance degradation.\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation of the JSON Data:**\n\n* **title:**  The main title of the document, \"Asynchronous Programming in Node.js\".\n* **description:** A brief introduction to the concept of asynchronous programming in Node.js.\n* **details:** An array containing various aspects of asynchronous programming, each with its own title, description, and optional code example.\n* **code_example:** A code snippet enclosed within `<precode>` tags, providing a practical example related to the respective topic.\n\n**Key Points to Remember:**\n\n* Node.js utilizes a non-blocking I/O model built on the foundation of asynchronous programming.\n* Asynchronous operations in Node.js are managed by the Event Loop, which orchestrates the execution of callbacks and tasks.\n* Promises and async/await offer a more structured and readable way to handle asynchronous operations compared to traditional callbacks.\n* Asynchronous programming significantly enhances Node.js's performance, responsiveness, resource utilization, and scalability.\n\nBy understanding the fundamentals of asynchronous programming, you can develop more efficient and robust Node.js applications.\n"},
      ],
    },
  ],
});
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  