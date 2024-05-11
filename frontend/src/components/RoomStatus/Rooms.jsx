function Rooms(props){
    let color;
    if (props.status === 'vacant'){
        color = 'green';
    } else if (props.status === 'semi-vacant'){
        color = 'yellow';
    } else {
        color = 'red';
    }
    return (
        <div className="room-box">
            <h2>{props.roomNo}</h2>
            <p>{props.floorNo}</p>
            <p>{props.status}</p>
            <div className="status-box" style={{backgroundColor: `${color}`}}></div>
            {/* <p>Room No.: {props.roomNo}</p>
            <p>Floor No.: {props.floorNo}</p>
            <p>Status: {props.status}</p>
            <div className="status-box" style={{backgroundColor: `${color}`}}></div> */}
        </div>
    );
}

export default Rooms;