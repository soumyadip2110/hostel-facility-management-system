import { Link } from "react-router-dom";

function SideBar(){    
    return (
        <div className="side-bar">
            <h2>SMIT Hostel Facility Management System</h2>
            <ul>
                <li>
                    <Link to='/admin/' className="link">Renovation</Link>
                </li>
                <li>
                    <Link to='/admin/attendance' className="link">Attendance</Link>
                </li>
                <li>
                    <Link to='/admin/attendance-record' className="link">Attendance Record</Link>
                </li>
                <li>
                    <Link to='/admin/student-details' className="link">Student Details</Link>
                </li>
                <li>
                    <Link to='/admin/room-status' className="link">Rooms Status</Link>
                </li>
                <li>
                    <Link to='/admin/new-student' className="link">New Student Entry</Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;