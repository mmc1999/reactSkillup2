import "./header.styles.css"
import {useNavigate} from "react-router-dom"

const Header = ( ) => {
    const navigate = useNavigate();

    const handleLogout= () => {
        localStorage.removeItem("logged")
        navigate("/login", {replace:true});
    }

    return (
        <header>
            <span>GOSCRUM</span>
            <div onClick={handleLogout}>x</div>
        </header>
    )
}

export default Header