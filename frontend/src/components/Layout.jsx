import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Layout(){
    return (
        <div className="layout">
            <SideBar />
            <Outlet />
        </div>
    );
}

export default Layout;