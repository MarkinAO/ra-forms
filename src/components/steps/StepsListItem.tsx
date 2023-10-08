import { IData } from "./models";

interface stepsListItemProps {
    item: IData
    deletItem: Function
    editItem: Function
}

function StepsListItem(props: stepsListItemProps) {
    const { item, deletItem, editItem } = props;

    return(
        <>
            <div className="item-date">{item.date}</div>
            <div className="item-distance">{item.distance}</div>
            <div className="item-buttons">
                <div className="item-button item-button_edit" onClick={() => editItem(item)}></div>
                <div className="item-button item-button_delete" onClick={() => deletItem(item.id)}></div>
            </div>
        </>
    )
}

export default StepsListItem;