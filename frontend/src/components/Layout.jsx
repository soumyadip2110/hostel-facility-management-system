// import Renovation from "./Renovation/Renovation";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Layout(){
    return (
        <div className="layout">
            <SideBar />
            {/* <Renovation /> */}
            <Outlet />
        </div>
    );
}

export default Layout;