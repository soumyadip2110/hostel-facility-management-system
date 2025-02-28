import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2002',
    database: 'test'
});

// Renovation
function renovationStatus(callback) {
    pool.query('select * from roomrenovation', (err, results) => {
        if (err) {
            console.log("error triggered at line 13");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function delRenoRow(rowId, callback) {
    let d = new Date();
    let date = d.toLocaleDateString()
    let time = d.toLocaleTimeString();
    let date_time = date + ' ' + time
    pool.query(`insert into renoLogs (type, time, roomNo, pNo) select type, '${date_time}', roomNo, pNo from roomrenovation where renoId = ?`, [rowId], (err, results) => {
        if (err) {
            console.log(err);
            console.log("error triggered at line 50");
        } else {
            console.log('success');
        }
    })
    pool.query('delete from roomrenovation where renoId = ?', [rowId], (err, results) => {
        if (err) {
            console.log("error triggered at line 58");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function getRenoLogs(callback) {
    pool.query('select * from renoLogs', (err, results) => {
        if (err) {
            console.log("error triggered at line 69");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function filterLogs(type, callback) {
    pool.query('select * from renoLogs where type = ?', [type], (err, results) => {
        if (err) {
            console.log("error triggered at line 93");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

// Attendance
function attendance(callback) {
    let d = new Date();
    let date = d.toISOString().slice(0, 10);
    pool.query('select * from stdattendance where date = ?', [date], (err, results) => {
        if (err) {
            console.log("error triggered at line 83");
            console.log(err);
        }
        else {
            if (results.length === 0) {
                pool.query('select regNo from stdmaster', (err, regNoResult) => {
                    if (err) {
                        console.log("error triggered at line 89");
                    } else {
                        const allRegNo = regNoResult.map(row => row.regNo);
                        pool.query('select attendance_id from stdattendance order by attendance_id desc limit 1', (err, lastAttnIdResults) => {
                            if (err) {
                                console.log("error triggered at line 98");
                            } else {
                                let newAttnId = lastAttnIdResults.length > 0 ? lastAttnIdResults[0].attendance_id : 0;
                                for (let i = 0; i < allRegNo.length; i++) {
                                    newAttnId++;
                                    pool.query('insert into stdattendance values (?, ?, ?, ?)', [newAttnId, allRegNo[i], 'Present', date], (err, results) => {
                                        if (err) {
                                            console.log("error triggered at line 108");
                                        } else {
                                            console.log('new attendance success');
                                        }
                                    })
                                }
                                pool.query('select name, regNo, roomNo, pNo, DATE_FORMAT(date, "%d-%m-%Y") as date, status from stdmaster inner join stdattendance using (regNo) where stdattendance.date = ?', [date],
                                (err, results) => {
                                    if (err) {
                                        console.log("error triggered at line 25");
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        callback(null, results);
                                    }
                                })
                            }
                        })
                    }
                })

            }
            else{
                pool.query('select name, regNo, roomNo, pNo, DATE_FORMAT(date, "%d-%m-%Y") as date, status from stdmaster inner join stdattendance using (regNo) where stdattendance.date = ?', [date], 
                (err, results) => {
                    if (err){
                        console.log("error triggered at line 25");
                        console.log(err);
                        callback(err, null);
                    } else{
                        callback(null, results);
                    }
                })
            }
        }
    });
}

function updateAttendance(status, regNo, callback) {
    let d = new Date();
    let date = d.toISOString().slice(0, 10);
    pool.query('update stdattendance set status = ? where regNo = ? and date = ?', [status, regNo, date], (err, results) => {
        if (err) {
            console.log("error triggered at line 82");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function markAll(status, callback) {
    let d = new Date();
    let date = d.toISOString().slice(0, 10);
    pool.query('update stdattendance set status = ? where date = ?', [status, date], (err, results) => {
        if (err) {
            console.log("error triggered at line 104");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function searchStudent(search, callback) {
    let d = new Date();
    let date = d.toISOString().slice(0, 10);
    pool.query('select name, regNo, roomNo, pNo, DATE_FORMAT(date, "%d-%m-%Y") as date, status from stdmaster inner join stdattendance using (regNo) where date = ? and (stdmaster.name = ? or stdmaster.regNo = ? or stdmaster.roomNo = ?)', [date, search, search, search],
        (err, results) => {
            if (err) {
                console.log("error triggered at line 116");
                callback(err, null);
            } else {
                callback(null, results);
            }
        })
}

// Attendance Record
function attendanceRecord(callback){
    pool.query('select regNo, status, DATE_FORMAT(date, "%d-%m-%Y") as date from stdattendance', (err, results) => {
        if (err) {
            console.log("error triggered at line 189");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function searchAttendanceRecord(search, callback){
    pool.query('select regNo, status, DATE_FORMAT(date, "%d-%m-%Y") as date from stdattendance where regNo = ?',
    [search], (err, results) => {
        if (err) {
            console.log("error triggered at line 201");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function searchAttendanceRecordDate(search, callback){
    pool.query('select regNo, status, DATE_FORMAT(date, "%d-%m-%Y") as date from stdattendance where date = ?',
    [search], (err, results) => {
        if (err) {
            console.log("error triggered at line 201");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

// Student Details
function stdDetails(callback) {
    pool.query('select * from stdmaster', (err, results) => {
        if (err) {
            console.log("error triggered at line 37");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

function searchStudentDetails(search, callback) {
    pool.query('select * from stdmaster where regNo = ? or name = ? or roomNo = ?',
    [search, search, search], (err, results) => {
        if (err) {
            console.log("error triggered at line 116");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

// Admin Login
function login(username, password, callback) {
    const results = { ok: 'ok' };
    const results2 = { ok: 'ok2' };
    if (username === 'admin'){
        if (password === '123') {
            callback(null, results);
        } else {
            callback('error1', null);
        }
    }
    else if (username === 'student'){
        if (password === '12345'){
            callback(null, results2);
        } else {
            console.log(username);
            console.log(password);
            callback('error2', null);
        }
    }
    else {
        console.log('invalid input');
        callback('error3', null);
    }
}

// Student Module
function studentModule(roomNo, type, pNo, description, callback){
    pool.query('select renoId from roomrenovation order by renoId desc limit 1', (err, lastRenoIdResults) => {
        if (err) {
            console.log("error triggered at line 212");
        } else {
            let newRenoId = lastRenoIdResults.length > 0 ? (lastRenoIdResults[0].renoId + 1) : 0;
            pool.query('insert into roomrenovation values (?, ?, ?, ?, ?)',
            [roomNo, type, pNo, description, newRenoId], (err, results) => {
                if (err) {
                    console.log("error triggered at line 218", err);
                    callback(err, null);
                } else {
                    callback(null, results);
                }
            })
        }
    })
}

// New Student Entry
function studentEntry(name, regNo, pNo, roomNo, parentNo, address, callback) {
    pool.query('insert into stdmaster values (?, ?, ?, ?, ?, NULL, NULL, ?)',
        [regNo, name, pNo, parentNo, address, roomNo], (err, results) => {
            if (err) {
                console.log("error triggered at line 137", err);
                callback(err, null);
            } else {
                callback(null, results);
            }
        })
}

// Room Status
function getRoomsStatus(callback) {
    pool.query('select * from roomstatus', (err, results) => {
        if (err) {
            console.log("error triggered at line 172");
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

export { searchStudentDetails, searchAttendanceRecordDate, searchAttendanceRecord, attendanceRecord, studentModule, getRoomsStatus, renovationStatus, attendance, stdDetails, delRenoRow, getRenoLogs, updateAttendance, filterLogs, markAll, searchStudent, login, studentEntry };
