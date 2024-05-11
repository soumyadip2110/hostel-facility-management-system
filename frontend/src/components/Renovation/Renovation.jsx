import { useCallback, useEffect, useState } from "react";
import RenoHeaders from "./RenoHeaders";
import RenoRows from "./RenoRows";
import RenoLogs from "./RenoLogs";

function Renovation() {
    const [renoData, setRenoData] = useState([]);

    function fetchData(){
        fetch('http://localhost:5000/renovation-status', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accepts': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setRenoData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const deleteRow = useCallback((rowId) => {
        fetch('http://localhost:5000/delete-reno-row', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rowId: rowId })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchData();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }, []);

    return (
        <div className="renovation-container">
            <h2>
                Renovation Status
                <RenoLogs/>
            </h2>
            <RenoHeaders />
            {renoData.map((rows) => {
                return (
                    <RenoRows
                        key = {rows.renoId}
                        id = {rows.renoId}
                        roomNo = {rows.roomNo}
                        type = {rows.type}
                        pNo = {rows.pNo}
                        description = {rows.description}
                        deleteRow = {deleteRow}
                    />
                )
            })}
        </div>
    );
}

export default Renovation;