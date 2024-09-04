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
        {text: "Explain the concept in Details on Topic: Python Basic, Chapter: Variables and Data Types in JSON Format with list of array with fields as title, explanation on give chapter in detail, Code Example (Code field in <precode> format) if applicable"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"title\": \"Variables and Data Types in Python\",\n  \"explanation\": \"Variables are like containers that hold data in your Python programs.  Data types tell Python what kind of data is being stored in each variable. Understanding these concepts is crucial for writing effective Python code.\",\n  \"content\": [\n    {\n      \"title\": \"Variables\",\n      \"explanation\": \"Variables are named references to data. They allow you to store and manipulate information within your program. Think of them as labels attached to values.\",\n      \"code\": \"<precode>\\nname = \\\"Alice\\\"\\nage = 30\\nheight = 1.65\\n</precode>\"\n    },\n    {\n      \"title\": \"Data Types\",\n      \"explanation\": \"Data types define the kind of data a variable can hold. Python has several built-in data types, each with its unique characteristics and operations.\",\n      \"content\": [\n        {\n          \"title\": \"Integers (int)\",\n          \"explanation\": \"Integers represent whole numbers (e.g., 10, -5, 0).\",\n          \"code\": \"<precode>\\nnumber = 10\\n</precode>\"\n        },\n        {\n          \"title\": \"Floats (float)\",\n          \"explanation\": \"Floats represent numbers with decimal points (e.g., 3.14, -2.5).\",\n          \"code\": \"<precode>\\npi = 3.14159\\n</precode>\"\n        },\n        {\n          \"title\": \"Strings (str)\",\n          \"explanation\": \"Strings represent sequences of characters (e.g., \\\"Hello world!\\\", \\\"Python\\\").\",\n          \"code\": \"<precode>\\ngreeting = \\\"Hello, world!\\\"\\n</precode>\"\n        },\n        {\n          \"title\": \"Booleans (bool)\",\n          \"explanation\": \"Booleans represent truth values, either True or False.\",\n          \"code\": \"<precode>\\nis_active = True\\n</precode>\"\n        },\n        {\n          \"title\": \"Lists (list)\",\n          \"explanation\": \"Lists are ordered collections of items. They can hold items of different data types.\",\n          \"code\": \"<precode>\\ncolors = [\\\"red\\\", \\\"green\\\", \\\"blue\\\"]\\n</precode>\"\n        },\n        {\n          \"title\": \"Tuples (tuple)\",\n          \"explanation\": \"Tuples are similar to lists, but they are immutable (cannot be changed after creation).\",\n          \"code\": \"<precode>\\ncoordinates = (10, 20)\\n</precode>\"\n        },\n        {\n          \"title\": \"Dictionaries (dict)\",\n          \"explanation\": \"Dictionaries are unordered collections of key-value pairs. Keys must be unique and immutable (strings, numbers, tuples).\",\n          \"code\": \"<precode>\\nperson = {\\\"name\\\": \\\"Alice\\\", \\\"age\\\": 30}\\n</precode>\"\n        }\n      ]\n    },\n    {\n      \"title\": \"Variable Assignment\",\n      \"explanation\": \"You use the assignment operator (=) to assign a value to a variable.\",\n      \"code\": \"<precode>\\nmessage = \\\"Hello\\\"\\n</precode>\"\n    },\n    {\n      \"title\": \"Data Type Conversion\",\n      \"explanation\": \"Sometimes you need to convert data from one type to another. Python provides functions like `int()`, `float()`, and `str()` for this purpose.\",\n      \"code\": \"<precode>\\n# Convert string to integer\\nnumber = int(\\\"123\\\")\\n\\n# Convert integer to float\\ndecimal = float(10)\\n</precode>\"\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  
  