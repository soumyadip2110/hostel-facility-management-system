import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Layout from './components/Layout';
import Attendance from './components/Attendance/Attendance';
import Renovation from './components/Renovation/Renovation';
import StudentDetails from './components/StudentDetails/StudentDetails';
import Login from './components/Login/Login';
import NewStudent from './components/NewStudent/NewStudent';
import RoomStatus from './components/RoomStatus/RoomStatus';
import StudentModule from './components/StudentModule/StudentModule';
import AttendanceRecord from './components/AttendanceRecord/AttendanceRecord';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Renovation />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance-record" element={<AttendanceRecord />} />
        <Route path="student-details" element={<StudentDetails />} />
        <Route path="room-status" element={<RoomStatus />} />
        <Route path="new-student" element={<NewStudent />} />
      </Route>
      <Route path="/student" element={<StudentModule />}></Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
