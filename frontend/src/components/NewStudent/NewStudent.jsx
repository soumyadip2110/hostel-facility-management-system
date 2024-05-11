import { useState } from "react";
import './css/style3.css'

function NewStudent(){
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [pNo, setPno] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [parentNo, setParentNo] = useState('');
    const [address, setAddress] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:5000/student-entry', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                regNo: regNo,
                pNo: pNo,
                roomNo: roomNo,
                parentNo: parentNo,
                address: address
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
        // <div className="new-student-container">
        //     <h1>New Student Entry</h1>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Name</label>
        //             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        //         </div>
        //         <div>
        //             <label>Registration No.</label>
        //             <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
        //         </div>
        //         <div>
        //             <label>Phone No.</label>
        //             <input type="text" value={pNo} onChange={(e) => setPno(e.target.value)} />
        //         </div>
        //         <div>
        //             <label>Room No.</label>
        //             <input type="text" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
        //         </div>
        //         <div>
        //             <label>Parent No.</label>
        //             <input type="text" value={parentNo} onChange={(e) => setParentNo(e.target.value)} />
        //         </div>
        //         <div>
        //             <label>Address</label>
        //             <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        //         </div>
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
        <div className="wrapper2">
            <form onSubmit={handleSubmit}>
                <h1>New Student's Enrollment...</h1>
                <p>Please Enter Details for New Student's Enrollment...</p>
                <div className="input-box">
                    <input type="text" placeholder="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Registation id" name="Registation_id" value={regNo} onChange={(e) => setRegNo(e.target.value)} required/>
                    <i className='bx bxs-lock-alt'></i>
                </div>

                <div className="input-box">
                    <input type="text" placeholder="Room no" name="Room_no" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} required/>
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className="input-box ">
                    <input type="text " placeholder="Phone Number " name="Phone_number" value={pNo} onChange={(e) => setPno(e.target.value)} required/>
                </div>
                <div className="input-box ">
                    <input type="text " placeholder="Parent Number " name="Parent_number" value={parentNo} onChange={(e) => setParentNo(e.target.value)} required/>
                </div>
                <div className="input-box ">
                    <input type="text " placeholder="Address " name="Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                </div>
                <button type="submit " className="btn">Submit</button>
            </form>
        </div>
    );
}

export default NewStudent;