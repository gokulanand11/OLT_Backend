import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "./config/env.js";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Assignment from "./models/Assignment.js";
import Assessment from "./models/Assessment.js";

async function seedData() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");

    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Assignment.deleteMany({}),
      Assessment.deleteMany({})
    ]);

    // Create users
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      passwordHash: await bcrypt.hash("password123", 10),
      role: "admin"
    });

    const instructorUser = await User.create({
      name: "Dr. Sarah Wilson",
      email: "instructor@test.com",
      passwordHash: await bcrypt.hash("password123", 10),
      role: "instructor"
    });

    const learnerUser = await User.create({
      name: "Jane Learner",
      email: "learner@test.com",
      passwordHash: await bcrypt.hash("password123", 10),
      role: "learner"
    });

    // Create 5 courses with external links
    const courses = await Course.insertMany([
      {
        title: "JavaScript Fundamentals",
        description: "Learn JavaScript basics from freeCodeCamp",
        instructorId: instructorUser._id,
        externalUrl: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
      },
      {
        title: "Python for Beginners",
        description: "Complete Python course from Codecademy",
        instructorId: instructorUser._id,
        externalUrl: "https://www.codecademy.com/learn/learn-python-3"
      },
      {
        title: "HTML & CSS Basics",
        description: "Web development fundamentals from MDN",
        instructorId: instructorUser._id,
        externalUrl: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web"
      },
      {
        title: "React Development",
        description: "React tutorial from official React docs",
        instructorId: instructorUser._id,
        externalUrl: "https://react.dev/learn"
      },
      {
        title: "Git & GitHub",
        description: "Version control with Git from GitHub Learning Lab",
        instructorId: instructorUser._id,
        externalUrl: "https://skills.github.com/"
      }
    ]);

    // Create quizzes for each course
    await Assessment.insertMany([
      {
        courseId: courses[0]._id,
        title: "JavaScript Basics Quiz",
        passMark: 70,
        questions: [
          {
            text: "What is the correct way to declare a variable in JavaScript?",
            options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
            correctIndex: 0
          },
          {
            text: "Which method is used to add an element to the end of an array?",
            options: ["push()", "add()", "append()", "insert()"],
            correctIndex: 0
          },
          {
            text: "What does '===' operator do in JavaScript?",
            options: ["Assignment", "Comparison without type checking", "Strict equality comparison", "Not equal"],
            correctIndex: 2
          }
        ]
      },
      {
        courseId: courses[1]._id,
        title: "Python Fundamentals Quiz",
        passMark: 70,
        questions: [
          {
            text: "How do you create a function in Python?",
            options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
            correctIndex: 1
          },
          {
            text: "Which data type is ordered and changeable in Python?",
            options: ["Tuple", "Set", "List", "Dictionary"],
            correctIndex: 2
          },
          {
            text: "What is the correct file extension for Python files?",
            options: [".py", ".python", ".pt", ".pyt"],
            correctIndex: 0
          }
        ]
      },
      {
        courseId: courses[2]._id,
        title: "HTML & CSS Quiz",
        passMark: 70,
        questions: [
          {
            text: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
            correctIndex: 0
          },
          {
            text: "Which CSS property is used to change the text color?",
            options: ["text-color", "font-color", "color", "text-style"],
            correctIndex: 2
          },
          {
            text: "What is the correct HTML element for the largest heading?",
            options: ["<heading>", "<h6>", "<h1>", "<head>"],
            correctIndex: 2
          }
        ]
      },
      {
        courseId: courses[3]._id,
        title: "React Basics Quiz",
        passMark: 70,
        questions: [
          {
            text: "What is React?",
            options: ["A database", "A JavaScript library", "A CSS framework", "A server"],
            correctIndex: 1
          },
          {
            text: "Which hook is used for state management in React?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            correctIndex: 1
          },
          {
            text: "What is JSX?",
            options: ["JavaScript XML", "Java Syntax Extension", "JSON Extended", "JavaScript eXtended"],
            correctIndex: 0
          }
        ]
      },
      {
        courseId: courses[4]._id,
        title: "Git & GitHub Quiz",
        passMark: 70,
        questions: [
          {
            text: "What command is used to initialize a Git repository?",
            options: ["git start", "git init", "git create", "git new"],
            correctIndex: 1
          },
          {
            text: "Which command is used to stage files for commit?",
            options: ["git stage", "git add", "git commit", "git push"],
            correctIndex: 1
          },
          {
            text: "What does 'git clone' do?",
            options: ["Creates a new repository", "Copies a repository to local machine", "Deletes a repository", "Renames a repository"],
            correctIndex: 1
          }
        ]
      }
    ]);

    console.log("Final seed data created successfully!");
    console.log(`Created ${courses.length} courses with external links and quizzes`);
    console.log("Test accounts:");
    console.log("Admin: admin@test.com / password123");
    console.log("Instructor: instructor@test.com / password123");
    console.log("Learner: learner@test.com / password123");

  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedData();