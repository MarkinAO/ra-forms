import { useState, useEffect } from "react";
import moment from "moment/moment";
import "moment/locale/ru";
import { IData } from "./models";

interface IFormProps {
    addNewItem: Function
    itemForEdit: IData | null
    editItem: Function
}

function StepsForm(props: IFormProps) {
    let [date, setDate] = useState('');
    let [distance, setdistance] = useState('');
    const { addNewItem, editItem } = props;
    let { itemForEdit } = props;
    let [dateClass, setDateClass] = useState('stepsInput');
    let [distanceClass, setDistanceClass] = useState('stepsInput');

    useEffect(() => {        
        if(itemForEdit) {        
            onChangeDate({value: itemForEdit.date.split('.').join('')});
            onChangeDistance({value: itemForEdit.distance});
        }
    }, [itemForEdit])

    const onSubmit = (e: any) => {
        e.preventDefault();
        if(dateClass !== 'stepsInput complete') {
            setDateClass(dateClass = 'stepsInput error');
            return;
        }
        if(distanceClass !== 'stepsInput complete') {
            setDistanceClass(distanceClass = 'stepsInput error');
            return;
        }

        if(itemForEdit) {
            const data = {
                date: date,
                distance: distance,
                id: itemForEdit.id
            }
            editItem(data);
            itemForEdit = null;
        } else {
            const data = {
                date: date,
                distance: distance,
                id: String(Date.now()) + date + distance
            }
            addNewItem(data);
        }
        
        setDate(date = '');
        setdistance(distance = '');
        setDateClass(dateClass = 'stepsInput');
        setDistanceClass(distanceClass = 'stepsInput');
    }

    const onChangeDate = (e: any) => {
        let { value } = e.target || e;
        const result = /[\d.]*/.exec(value);
        value = result ? result[0] : '';
        if(value.length > 10) return;

        const onlyNumbers = /\d{8}/.exec(value);        
        if(onlyNumbers !== null && value.length === 8) {
            value = value.split('').map((el: string, i: number) => {
                if(i === 1 || i === 3) {
                    return el+='.';
                } else {
                    return el;
                }
            }).join('');
        }

        if(value.length === 10) {
            //moment принимает строку формата мм.дд.гггг, а не дд.мм.гггг , поэтому делаем перестановку
            const memory = value;
            value = value.substring(3, 6) + value.substring(0, 3) + value.substring(6);
            const dateStr = moment(value);

            if(!dateStr.isValid()) {
                setDateClass(dateClass = 'stepsInput error');
            } else {
                setDateClass(dateClass = 'stepsInput complete');
                value = dateStr.format('DD.MM.YYYY');
            }
            if(!dateStr.isValid()) value = memory;
        } else {
            setDateClass(dateClass = 'stepsInput');
        }
        setDate(date = value);
    }

    const onChangeDistance = (e: any) => {
        let { value } = e.target || e;
        const result = /[\d.]*/.exec(value);
        value = result ? result[0] : '';
        setdistance(distance = value);

        if(value.length > 0) {
            setDistanceClass(distanceClass = 'stepsInput complete');
        } else {
            setDistanceClass(distanceClass = 'stepsInput');
        }
    }    

    return(
        <form className="stepsForm" onSubmit={onSubmit}>
            <div>
                <div>Дата (ДД.ММ.ГГГГ)</div>
                <input className={dateClass} type="text" onChange={onChangeDate} value={date} placeholder="04.02.1990 или 04021990" />
            </div>
            <div>
                <div>Пройдено км</div>
                <input className={distanceClass} type="text" onChange={onChangeDistance} value={distance} placeholder="15.5" />
            </div>            
            <button className="stepsInput stepsButton">OK</button>
        </form>
    )
}

export default StepsForm;