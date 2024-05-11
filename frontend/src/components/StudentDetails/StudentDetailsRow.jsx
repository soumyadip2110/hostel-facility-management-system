function StudentDetailsRow(props) {
    return (
        <div className="student-details-rows">
            <div className="std-details-item std-details-item-1">{props.name}</div>
            <div className="std-details-item std-details-item-2">{props.regNo}</div>
            <div className="std-details-item std-details-item-3">{props.pNo}</div>
            <div className="std-details-item std-details-item-4">{props.roomNo}</div>
            <div className="std-details-item std-details-item-5">{props.parentNo}</div>
            <div className="std-details-item std-details-item-6">{props.address}</div>
            {/* <div className="std-details-item std-details-item-7">{props.tg_name}</div>
            <div className="std-details-item std-details-item-8">{props.tg_pNo}</div> */}
        </div>
    );
}

export default StudentDetailsRow;