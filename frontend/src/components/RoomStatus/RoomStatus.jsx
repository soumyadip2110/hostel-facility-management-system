import { useEffect, useState } from "react";
import Rooms from "./Rooms";

function RoomStatus(){
    const [roomsData, setRoomsData] = useState([]);
    function fetchData() {
        fetch('http://localhost:5000/room-status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setRoomsData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, [setRoomsData]);
    return (
        <div className="room-status-container-1">
            <h1>Rooms Status</h1>
            <div className="room-status-container-2">
                {roomsData.map((room) => {
                    return (
                        <Rooms 
                            roomNo = {room.roomNo}
                            floorNo = {room.floorNo}
                            status = {room.status}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RoomStatus;