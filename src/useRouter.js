import * as React from "react";
import Home from './pages'
import Dashboard from "./pages/Dashboard/Dashboard";
import Mycourses from "./pages/Mycourses/Mycourses";
import Myattendance from "./pages/Myattendances/Myattendances";
import Mygradebook from "./pages/Mygradebook/Mygradebook";
import CourseContent from "./pages/Mycourses/CourseContent";
import LectureRoom from "./pages/LectureRoom";

const routes =
  [
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/mycourses',
          children: [
            {
              path: '/mycourses/all',
              element: <Mycourses />
            },
            {
              path: '/mycourses/:course_id',
              element: <CourseContent />
            },
            {
              path: '/mycourses/:course_id/lectureRoom',
              element: <LectureRoom />
            }
          ]
        },
        {
          path: '/myattendance',
          element: <Myattendance />
        },
        {
          path: '/mygradebook',
          element: <Mygradebook />
        }
      ]
    }
  ];

export default routes;
