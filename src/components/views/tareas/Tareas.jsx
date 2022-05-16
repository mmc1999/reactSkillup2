import Header from "../../header/Header";
import "./tareas.styles.css";
import { useResize } from "../../../hooks/useResize";
import Card from "../../card/Card";
import { TaskForm } from "../../taskform/TaskForm";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FormControl, FormControlLabel, RadioGroup, FormLabel, Radio} from "@mui/material";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, deleteTask, editTaskStatus } from "../../action/tasksAction";


const Tareas = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState([]);
  const [tasksFromWho, setTasksFromWho] = useState("ALL")
  const [search, setSearch] = useState("")
  const dispatch = useDispatch();

  let { isPhone } = useResize();

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "me" : ""))
  }, [tasksFromWho])

  const {loading, error, tasks} = useSelector(state => {
    return state.tasksReducer
  })

  useEffect(() => {
    if(tasks.length) {
      setList(tasks);
      setRenderList(tasks)
    }
  
  }, [tasks])
  

  useEffect(() => {
    if(search)
      setRenderList(list.filter(data => data.title.startsWith(search)))
    else setRenderList(list)
  }, [search])
  
  if(error) return <div>Hay un error</div>

  
  const renderAllCards = () => {
    return renderList?.map((el) => <Card key={el.id} el={el} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />);
  };

  const renderColumnCards = (text) => {
    return renderList?.filter(data => data.status === text).map((el) => <Card key={el._id} el={el} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}  />);
  };


  const handleChangeImportant = (e) => {
    if(e.currentTarget.value === "ALL") setRenderList(list)
    else {
      setRenderList(
        list.filter(data => data.importance === e.currentTarget.value)
      )
    }
  } 

  const handleSearch = debounce(e => {
    setSearch(e?.target?.value)
  }, 1000)
  
  const handleDelete = (id) => dispatch(deleteTask(id)) 

  const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <div>
              <h2>Mis tareas</h2>
            </div>
            <div className="filters">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  onChange={(e) => setTasksFromWho(e.currentTarget.value)}
                >
                  <FormControlLabel 
                    value="ALL"
                    control={<Radio />} 
                    label="Todas" 
                  />
                  <FormControlLabel 
                    value="ME" 
                    control={<Radio />} 
                    label="Mis tareas" 
                  />
                </RadioGroup>
              </FormControl>
              <div className="search">
                <input 
                  type="text" 
                  placeholder="Buscar por titulo" 
                  onChange={handleSearch}
                />
              </div>
              <select 
                name="importance" 
                onChange={handleChangeImportant} 
                
              >
                <option value="">Seleccionar una prioridad</option>
                <option value="ALL">Todas</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>
            {isPhone ? (
                renderList?.length === 0 
                  ? <div>No hay tareas creadas</div> 
                  : <div className="list phone">{renderAllCards()}</div> 
              ) :
              (
                <div className="list_group">
                  {renderList?.length === 0
                    ? <div>No hay tareas creadas</div> 
                    : loading ? <Skeleton /> 
                    :<>
                      <div className="list">
                        <h4>Nuevas</h4>
                        <div className="list">{renderColumnCards("NEW")}</div>
                      </div>
                      <div className="list">
                        <h4>In-progress</h4>
                        <div className="list">{renderColumnCards("IN PROGRESS")}</div>
                      </div>
                      <div className="list">
                        <h4>Terminadas</h4>
                        <div className="list">{renderColumnCards("FINISHED")}</div>
                      </div>
                    </>
                  }
                </div>
              )
            }
          </div>
        </section>
      </main>
    </>
  );
};

export default Tareas;
