import { ITasks } from "./models";
import './SelectTask.css';

function SelectTask(props: ITasks) {
    const { tasks, curTask, setTask } = props;
    const handler = (e: any) => setTask(e.target.textContent);    
    
    return (
        <div className="tasks">
            <div className="title">Выберите какую задачу из д/з отобразить</div>
            { tasks.map(task => {
                let classes = 'task';
                if(task.taskName === curTask) classes += ' active';
                
                return (
                    <button className={classes} onClick={handler} key={task.taskName}>
                        { task.taskName }
                    </button>
                )                
            }) }
        </div>
    )
}

export default SelectTask;