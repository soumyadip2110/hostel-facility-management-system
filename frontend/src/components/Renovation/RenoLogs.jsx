import { useEffect, useState } from "react";

function RenoLogs() {
    const [logs, setLogs] = useState([]);
    const [logDisplay, setLogDisplay] = useState('none');

    function fetchLogs() {
        fetch('http://localhost:5000/reno-logs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setLogs(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    useEffect(() => {
        fetchLogs();
    }, []);

    function handleClick() {
        const logsTable = document.querySelector('.reno-logs-container');
        setLogDisplay(logDisplay === 'none' ? 'flex' : 'none')
        logsTable.style.display = logDisplay;
    }

    function filterLogs(e){
        if (e.target.innerText === 'All'){
            fetchLogs();
        }
        else {
            fetch('http://localhost:5000/filter-logs', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: e.target.innerText })
            })
            .then(response => response.json())
            .then(data => {
                setLogs(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    }

    return (
        <>
            <button className='reno-logs-btn' onClick={handleClick}>Logs</button>
            <div className="reno-logs-container">
                <div className="log-filter-box">
                    <button className="logs-filter" onClick={filterLogs}>All</button>
                    <button className="logs-filter" onClick={filterLogs}>Plumber</button>
                    <button className="logs-filter" onClick={filterLogs}>Carpenter</button>
                    <button className="logs-filter" onClick={filterLogs}>Electrician</button>
                </div>
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Time</th>
                            <th>Room No</th>
                            <th>Phone No</th>
                        </tr>
                    </thead>
                    {logs.map((log) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{log.type}</td>
                                    <td>{log.time}</td>
                                    <td>{log.roomNo}</td>
                                    <td>{log.pNo}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </>
    );
}

export default RenoLogs;