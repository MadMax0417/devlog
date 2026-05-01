import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


function Layout() {
    return(
        <>
        <Navbar />
        {/* child will be rendered here in outlet */}
        <Outlet /> 
        <Footer />
        </>
    )
}

export default Layout