import './App.css';
import Login from './components/views/auth/login/Login';
//import Register from './components/views/register/Register';
import Tareas from './components/views/tareas/Tareas';
import {Routes, Route, Navigate, useLocation} from "react-router-dom"
import {AnimatePresence, motion} from "framer-motion"
import {lazy,Suspense } from "react"
import Register from './components/views/auth/register/Register';
import Registered from './components/views/registered/Registered';
import Donate from './components/views/donate/Donate';

const RequiredOut = ({children}) => {
    if(!localStorage.getItem("logged")) {
        return <Navigate to="/login" replace={true} />
    } 

    return children
}

const Error404 = lazy(() => import("./components/views/error/Error404"))

const pageTransition = {
    in: {
        opacity:1
    },
    out: {
        opacity:0
    }
}

export const App = () => {
    const location = useLocation()
    return (
    <div >
        <AnimatePresence>
            <Routes location={location} key={location.pathname} >
                <Route 
                    path="/" 
                    element={
                        <RequiredOut>
                            <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                                <Tareas />
                            </motion.div>
                        </RequiredOut>
                    } 
                />
                <Route 
                    path="/login" 
                    element={
                        <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                            <Login />
                        </motion.div>
                    } 
                />
                <Route 
                    path="/register" 
                    element={
                        <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                            <Register />
                        </motion.div>
                    } 
                />
                <Route 
                    path="/registered/:teamID" 
                    element={
                        <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                            <Registered />
                        </motion.div>
                    } 
                />
                <Route 
                    path="/donate" 
                    element={
                        <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                            <Donate />
                        </motion.div>
                    } 
                />
                <Route 
                    path="*" 
                    element={
                        <motion.div className="page" initial="out" animate="in" exit="out" variants={pageTransition}>
                            <Suspense fallback={<p>...fdddddddddddddddd</p>}>
                                <Error404 />
                            </Suspense>
                        </motion.div>
                    } 
                />
            </Routes>  
        </AnimatePresence>
    </div>
    )
}
