import { useEffect, useState } from "react";
import AttenHeaders from "./AttenHeaders";
import AttenRows from "./AttenRows";

function Attendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [student, setStudent] = useState('');

    function fetchData() {
        fetch('http://localhost:5000/attendance', {
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

    // function updateStatus(e){
    const updateStatus = (e, regNo) => {
        let updatedStatus;
        if (e.target.style.backgroundColor === 'green') {
            updatedStatus = 'Present';
        } else if (e.target.style.backgroundColor === 'yellow') {
            updatedStatus = 'On leave';
        } else {
            updatedStatus = 'Absent';
        }
        fetch('http://localhost:5000/update-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: updatedStatus, regNo: regNo })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchData();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function markAll(e){
        let status;
        if (e.target.innerText === 'All Present'){
            status = 'Present';
        } else{
            status = 'On leave';
        }
        fetch('http://localhost:5000/attendance-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: status })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchData();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function handleChange(e){
        setStudent(e.target.value)
    }

    function stdSearch(){
        if (student.length > 0){
            fetch('http://localhost:5000/search-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search: student })
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
    }

    function handleReset(){
        fetchData();
        setStudent('');
    }
    
    return (
        <div className="attendance-container">
            <h2>Attendance</h2>
            <div className="mark-all-btn-container">
                <button className="mark-all-btn allPresentBtn" onClick={markAll}>All Present<div></div></button>
                <button className="mark-all-btn allOnLeaveBtn" onClick={markAll}>All On leave<div></div></button>
            </div>
            <div className="search-container">
                <input type="text" 
                    className="search-attendance" 
                    placeholder="Search student" 
                    value={student} 
                    onChange={handleChange}
                />
                <input type="submit"
                    className="search-attendance-submit"
                    value={'Search'}
                    onClick={stdSearch}
                />
                <button className="reset" onClick={handleReset}>Reset</button>
            </div>
            <AttenHeaders />
            {attendanceData.map((student) => {
                return (
                    <AttenRows
                        name={student.name}
                        regNo={student.regNo}
                        roomNo={student.roomNo}
                        pNo={student.pNo}
                        date={student.date}
                        status={student.status}
                        updateStatus={updateStatus}
                    />
                )
            })}
        </div>
    );
}

export default Attendance;