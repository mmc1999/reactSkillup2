import Header from "../../header/Header";
import "./tareas.styles.css";
import { useResize } from "../../../hooks/useResize";
import { cardsData } from "../tareas/data";
import Card from "../../card/Card";
import { TaskForm } from "../../taskform/TaskForm";


const Tareas = () => {
  let { isPhone } = useResize();

  const limitString = (str) => {
    if (str.length > 360) {
      return { string: str.slice(0, 360).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return cardsData.map((el) => <Card key={el.id} el={el} />);
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
            <div className="list phone">{renderAllCards()}</div>
          ) : (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="list">{renderAllCards()}</div>
              </div>
              <div className="list">
                <h4>In-progress</h4>
                <div className="list">{renderAllCards()}</div>
              </div>
              <div className="list">
                <h4>Terminadas</h4>
                <div className="list">{renderAllCards()}</div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Tareas;
