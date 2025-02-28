import { useEffect, useState } from "react";
import StudentDetailsHeaders from './StudentDetailsHeaders';
import StudentDetailsRow from './StudentDetailsRow';

function StudentDetails(){
    const [studentDetailsData, setStudentDetailsData] = useState([]);
    const [student, setStudent] = useState('');
    
    function fetchData(){
        fetch('http://localhost:5000/student-details', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accepts': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setStudentDetailsData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, [setStudentDetailsData])

    function handleChange(e){
        setStudent(e.target.value)
    }

    function stdDetailSearch(){
        if (student.length > 0){
            fetch('http://localhost:5000/search-student-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search: student })
            })
            .then(response => response.json())
            .then(data => {
                setStudentDetailsData(data);
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
        <div className="student-details-container">
            <h2>Student Details</h2>
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
                    onClick={stdDetailSearch}
                />
                <button className="reset" onClick={handleReset}>Reset</button>
            </div>
            <StudentDetailsHeaders/>
            {studentDetailsData.map((student) => {
                return (
                    <StudentDetailsRow
                        name = {student.name}
                        regNo = {student.regNo}
                        pNo = {student.pNo}
                        roomNo = {student.roomNo}
                        parentNo = {student.parentNo}
                        address = {student.address}
                    />
                )
            })}
        </div>
    );
}

export default StudentDetails;