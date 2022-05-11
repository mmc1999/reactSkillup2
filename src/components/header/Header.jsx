import "./header.styles.css"
import {useNavigate} from "react-router-dom"

const Header = ( ) => {
    const navigate = useNavigate();

    const handleLogout= () => {
        localStorage.removeItem("logged")
        localStorage.removeItem("userName")
        navigate("/login", {replace:true});
    }

    return (
        <header>
            <span>GOSCRUM</span>
            <div className="wrapper_right_header">
                <div>{localStorage.getItem("userName")}</div>
                <div onClick={handleLogout}>x</div>
            </div>
        </header>
    )
}

export default Header