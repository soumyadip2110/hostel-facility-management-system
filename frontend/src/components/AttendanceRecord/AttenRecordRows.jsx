function AttenRecordRows(props) {
    const status = props.status;
    let colour;
    if (status === 'Present'){
        colour = 'green';
    } else if (status === 'On leave') {
        colour = 'yellow';
    } else{
        colour = 'red';
    }

    return (
        <div className="attendance-rows attendance-record-rows">
            <div className="atten-item attendance-item-2">{props.regNo}</div>
            <div className="atten-item attendance-item-6">{props.date}</div>
            <div className="atten-item attendance-item-5">
                <div style={{marginRight:'6px', border:'2px solid black', backgroundColor: `${colour}`, height: '20px', width:'20px', margin:'2px', borderRadius:'50%'}}></div>
                <div style={{width:'80px'}}>{props.status}</div>
            </div>
        </div>
    );
}

export default AttenRecordRows;