function RenoRows(props) {
    function handleClick(){
        props.deleteRow(props.id)
    }
    
    return (
        <div className="renovation-rows">
            <div className="reno-item renovation-item-1">{props.roomNo}</div>
            <div className="reno-item renovation-item-2">{props.type}</div>
            <div className="reno-item renovation-item-3">{props.pNo}</div>
            <div className="reno-item renovation-item-4">{props.description}</div>
            <button className="reno-item renovation-item-5" onClick={handleClick}>Delete</button>
        </div>
    );
}

export default RenoRows;