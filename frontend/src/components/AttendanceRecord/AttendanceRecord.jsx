import { useEffect, useState } from "react";
import AttenRecordHeaders from "./AttenRecordHeaders";
import AttenRecordRows from "./AttenRecordRows";

function AttendanceRecord() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [student, setStudent] = useState('');
    const [date, setDate] = useState('');
    let route = 'search-student-record';

    function fetchData() {
        fetch('http://localhost:5000/attendance-record', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setAttendanceData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [setAttendanceData]);

    function handleChange(e){
        setStudent(e.target.value)
    }

    function handleChange2(e){
        setDate(e.target.value)
    }

    function search(search){
        fetch(`http://localhost:5000/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search: search })
            })
            .then(response => response.json())
            .then(data => {
                setAttendanceData(data);
                // fetchData();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function stdRecordSearch(){
        if (student.length > 0){
            route = 'search-student-record';
            search(student);
        }
        else if (date.length > 0){
            route = 'search-student-record-date';
            search(date);
        }
    }

    function handleReset(){
        fetchData();
        setStudent('');
        setDate('');
    }
    
    return (
        <div className="attendance-container">
            <h2>Attendance Record</h2>
            {/* <div className="mark-all-btn-container">
                <button className="mark-all-btn allPresentBtn" onClick={markAll}>All Present<div></div></button>
                <button className="mark-all-btn allOnLeaveBtn" onClick={markAll}>All On leave<div></div></button>
            </div> */}
            <div className="search-container">
                <input type="text" 
                    className="search-attendance" 
                    placeholder="Search student" 
                    value={student} 
                    onChange={handleChange}
                />
                <input type="date" 
                    className="search-attendance" 
                    placeholder="Search by date" 
                    value={date} 
                    onChange={handleChange2}
                />
                <input type="submit"
                    className="search-attendance-submit"
                    value={'Search'}
                    onClick={stdRecordSearch}
                />
                <button className="reset" onClick={handleReset}>Reset</button>
            </div>
            <AttenRecordHeaders />
            {attendanceData.map((student) => {
                return (
                    <AttenRecordRows
                        // name={student.name}
                        regNo={student.regNo}
                        // roomNo={student.roomNo}
                        // pNo={student.pNo}
                        date={student.date}
                        status={student.status}
                        // updateStatus={updateStatus}
                    />
                )
            })}
        </div>
    );
}

export default AttendanceRecord;