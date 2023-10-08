import { useState } from "react";
import StepsForm from "./StepsForm";
import StepsList from "./StepsList";
import './Steps.css';
import { IData } from "./models";

function Steps() {
    let [list, setList] = useState<IData[]>([]);
    let [itemForEdit, setEditItem] = useState<IData | null>(null);

    const listHandler = (newElement: IData) => {
        const flag = list.find(el => el.date === newElement.date);        
        let newList;        
        if(flag) {
            newList = list.map((el): IData => {
                if(el.date === newElement.date) el.distance = String(+el.distance + +newElement.distance);            
                return el;
            });
        } else {
            newList = [...list, newElement];
        }
        setList(list = [...newList]);
    }

    const deletItem = (id: string) => {
        const newList = list.filter(el => el.id !== id);
        setList(list = [...newList]);
    }

    const editItem = (item: IData) => setEditItem(itemForEdit = item);

    const callbackEditItem = (item: IData) => {
        const index = list.findIndex(el => el.id === item.id);
        setList(list.splice(index, 1, item));
        setList(list = [...list]);
        setEditItem(itemForEdit = null);
    }

    return(
        <div className="steps-container">
            <StepsForm addNewItem={(data: IData) => listHandler(data)} itemForEdit={itemForEdit} editItem={(data: IData) => callbackEditItem(data)} />
            <StepsList list={list} deletItem={(id: string) => deletItem(id)} editItem={(item: IData) => editItem(item)} />
        </div>
    )
}

export default Steps;