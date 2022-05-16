import "./header.styles.css"
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";


const Header = ( ) => {
    const navigate = useNavigate();
    const {tasks} = useSelector(state => {
        return state.tasksReducer
      })
    const handleLogout= () => {
        localStorage.removeItem("logged")
        localStorage.removeItem("userName")
        navigate("/login", {replace:true});
    }

    return (
        <header>
            <span>GOSCRUM</span>
            <div className="wrapper_right_header">
                <div>
                    <button onClick={() => navigate("/donate", {replace:true})}>
                        Donar
                    </button>
                </div>
                <div>Tareas creadas: {tasks?.length}</div>
                <div>{localStorage.getItem("userName")}</div>
                <div onClick={handleLogout}>x</div>
            </div>
        </header>
    )
}

export default Header