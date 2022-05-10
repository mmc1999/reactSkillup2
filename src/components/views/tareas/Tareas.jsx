import Header from "../../header/Header";
import "./tareas.styles.css";
import { useResize } from "../../../hooks/useResize";
import Card from "../../card/Card";
import { TaskForm } from "../../taskform/TaskForm";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const { REACT_APP_API_ENDPOINT } = process.env


const Tareas = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  let { isPhone } = useResize();

  useEffect(() => {
    setLoading(true)
    fetch(`${REACT_APP_API_ENDPOINT}task`, {
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("logged")
      },
    })
    .then(response => response.json())
    .then(data => {
      setList(data.result)
      setLoading(false)
    })
  }, [])
  
  const limitString = (str) => {
    if (str.length > 360) {
      return { string: str.slice(0, 360).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return list?.map((el) => <Card key={el.id} el={el} />);
  };

  const renderNewCards = () => {
    return list?.filter(data => data.status === "NEW").map((el) => <Card key={el._id} el={el} />);
  };

  const renderInProgressCards = () => {
    return list?.filter(data => data.status === "IN PROGRESS").map((el) => <Card key={el._id} el={el} />);
  };

  const renderFinishedCards = () => {
    return list?.filter(data => data.status === "FINISHED").map((el) => <Card key={el._id} el={el} />);
  };

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            list?.length === 0 
              ? <div>No hay tareas cread</div> 
              : <div className="list phone">{renderAllCards()}</div> 
          ) :
          (
            <div className="list_group">
              {list?.length === 0
                ? <div>No hay tareas cread</div> 
                : loading ? <Skeleton /> 
                :<>
                  <div className="list">
                    <h4>Nuevas</h4>
                    <div className="list">{renderNewCards()}</div>
                  </div>
                  <div className="list">
                    <h4>In-progress</h4>
                    <div className="list">{renderInProgressCards()}</div>
                  </div>
                  <div className="list">
                    <h4>Terminadas</h4>
                    <div className="list">{renderFinishedCards()}</div>
                  </div>
                </>
              }
            </div>
          )
          }
        </section>
      </main>
    </>
  );
};

export default Tareas;
