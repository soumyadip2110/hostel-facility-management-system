import { useState } from "react";
import './style4.css';

function StudentModule() {
    const [roomNo, setRoomNo] = useState('');
    const [selectedType, setSelectedType] = useState('Select Type');
    const [pNo, setPno] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(e){
        fetch('http://localhost:5000/student-module', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomNo: roomNo,
                type: selectedType,
                pNo: pNo,
                description: description
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return (
        <div className="student-module">
            <form onSubmit={handleSubmit}>
                <h1>Student's room complaints/renovation requests</h1>
                <h3>Enter your complaints or renovation requests...</h3>
                <div className="input-box-1">
                    <input type="text" placeholder="Room no" name="Room_no" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} required />
                </div>
                <select name="type" id="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required>
                    <option value="Select Type" disabled>Select Type</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Others">Others</option>
                </select>
                <div className="input-box-2">
                    <input type="text " placeholder="Phone Number" name="Phone_number" value={pNo} onChange={(e) => setPno(e.target.value)} required />
                </div>
                <textarea id="description" name="description" value={description} placeholder="Description" rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} required></textarea>
                <button type="submit" className="btn-1">Submit</button>
            </form>
        </div>
    );
}

export default StudentModule;