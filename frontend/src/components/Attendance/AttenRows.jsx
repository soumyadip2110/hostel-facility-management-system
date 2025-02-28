function AttenRows(props) {
    const status = props.status;
    let colour;
    if (status === 'Present'){
        colour = 'green';
    } else if (status === 'On leave') {
        colour = 'yellow';
    } else{
        colour = 'red';
    }

    function handleStatus(e){
        props.updateStatus(e, props.regNo)
    }
        
    return (
        <div className="attendance-rows">
            <div className="atten-item attendance-item-1">{props.name}</div>
            <div className="atten-item attendance-item-2">{props.regNo}</div>
            <div className="atten-item attendance-item-3">{props.roomNo}</div>
            <div className="atten-item attendance-item-4">{props.pNo}</div>
            <div className="atten-item attendance-item-6">{props.date}</div>
            <div className="atten-item attendance-item-5">
                <div style={{marginRight:'6px', border:'2px solid black', backgroundColor: `${colour}`, height: '20px', width:'20px', margin:'2px', borderRadius:'50%'}}></div>
                <div style={{width:'80px'}}>{props.status}</div>
                <div onClick={handleStatus} style={{cursor:'pointer', border:'2px solid black', marginLeft:'10px', backgroundColor: 'green', height: '20px', width:'20px', margin:'2px'}}></div>
                <div onClick={handleStatus} style={{cursor:'pointer', border:'2px solid black', backgroundColor: 'yellow', height: '20px', width:'20px', margin:'2px'}}></div>
                <div onClick={handleStatus} style={{cursor:'pointer', border:'2px solid black', backgroundColor: 'red', height: '20px', width:'20px', margin:'2px'}}></div>
            </div>
        </div>
    );
}

export default AttenRows;