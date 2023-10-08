import { IData } from "./models";
import StepsListItem from "./StepsListItem";

interface stepsListProps {
    list: IData[]
    deletItem: Function
    editItem: Function
}

function StepsList(props: stepsListProps) {
    const { list, deletItem, editItem } = props;
    
    list.sort((a, b): number => {
        let cur = a.date.split('.');
        let next = b.date.split('.');
        
        let i = 2;
        let res = 0;
        while(i >= 0) {
          res = +cur[i] - +next[i];
          if(res !== 0) return res;
          i--;
        }
        return res;
      })
    
    return(
        <div className="list-container">
            <div className="list-title">
                <div>Дата (ДД.ММ.ГГГГ)</div>
                <div>Пройдено км</div>
                <div>Действия</div>
            </div>
            <ul className="list-box">
                {list.map(item =>
                    <li className="item" key={item.id}>
                        <StepsListItem item={item} deletItem={deletItem} editItem={editItem} />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default StepsList;