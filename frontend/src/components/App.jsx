// import { useEffect, useState } from "react";
import Layout from "./Layout";

function App() {
    // const [data, setData] = useState('hi');

    // useEffect(() => {
    //     fetch('http://localhost:5000/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setData(data.msg);
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
    // }, []);

    // function handleClick(){
    //     fetch('http://localhost:5000/renovation-status', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setData(data[0].roomNo);
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
    // }
    
    return (
        <Layout />
    );
}

export default App;