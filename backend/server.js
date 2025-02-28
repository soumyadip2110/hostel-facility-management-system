import express from "express";
import { searchStudentDetails, searchAttendanceRecordDate, searchAttendanceRecord, attendanceRecord, studentModule, attendance, renovationStatus, stdDetails, delRenoRow, getRenoLogs, updateAttendance, filterLogs, markAll, searchStudent, login, studentEntry, getRoomsStatus } from "./database.js";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());

// Renovation Status
app.get('/renovation-status', (req, res) => {
    renovationStatus((err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

app.get('/reno-logs', (req, res) => {
    getRenoLogs((err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

app.post('/delete-reno-row', (req, res) => {
    const rowId = req.body.rowId;
    delRenoRow(rowId, (err, result) => {
        if (err){
            console.log("Error");
        }
        else {
            console.log('Renovation row deleted successfully')
            res.send({message: 'Renovation row deleted successfully'});
        }
    })
});

app.post('/filter-logs', (req, res) => {
    const type = req.body.type;
    filterLogs(type, (err, result) => {
        if (err){
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

// Attendance
app.get('/attendance', (req, res) => {
    attendance((err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

app.post('/update-attendance', (req, res) => {
    const status = req.body.status;
    const regNo = req.body.regNo;
    updateAttendance(status, regNo, (err, result) => {
        if (err){
            console.log("Error");
        }
        else {
            console.log('Attendance updated successfully')
            res.send({message: 'Attendance updated successfully'});
        }
    })
});

app.post('/attendance-all', (req, res) => {
    markAll(req.body.status, (err, result) => {
        if (err){
            console.log("Error");
        }
        else {
            console.log('Attendance updated successfully')
            res.send({message: 'Attendance updated successfully'});
        }
    })
});

app.post('/search-student', (req, res) => {
    searchStudent(req.body.search, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
})

// Attendance Record
app.get('/attendance-record', (req, res) => {
    attendanceRecord((err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

app.post('/search-student-record', (req, res) => {
    searchAttendanceRecord(req.body.search, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

app.post('/search-student-record-date', (req, res) => {
    searchAttendanceRecordDate(req.body.search, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

// Student Details
app.get('/student-details', (req, res) => {
    stdDetails((err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

app.post('/search-student-details', (req, res) => {
    searchStudentDetails(req.body.search, (err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

// Login
app.post('/login', (req, res) => {
    login(req.body.username, req.body.password, (err, result) => {
        if (err) {
            console.log(err);
            console.log("Error at line 142");
        }
        else {
            res.send(result);
        }
    })
})

// Student Module
app.post('/student-module', (req, res) => {
    studentModule(req.body.roomNo, req.body.type, req.body.pNo, req.body.description, (err, result) => {
        if (err) {
            console.log("Error");
            res.send({message: 'Invalid input'});
        }
        else {
            res.send({message: 'Complaint/Renovation request submitted successfully'});
        }
    })
})

// New Student Entry
app.post('/student-entry', (req, res) => {
    studentEntry(req.body.name, req.body.regNo, req.body.pNo, req.body.roomNo, req.body.parentNo, req.body.address, (err, result) => {
        if (err) {
            console.log("Error");
            res.send({message: 'Invalid input'});
        }
        else {
            res.send({message: 'New entry done successfully'});
        }
    })
})

// Room Status
app.get('/room-status', (req, res) => {
    getRoomsStatus((err, result) => {
        if (err) {
            console.log("Error");
        }
        else {
            res.send(result);
        }
    })
});

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});