import React,{ useState } from "react";
import CostForm from "./CostForm";
import './NewCost.css';

const NewCost = (props) => {
    const[formVisible,setFormVisible] = useState(false)
    const onSaveCostDataHandler = (inputCostData) => {
        const costData = {
            ...inputCostData,
            id:Math.random().toString()
        }
        props.addCost(costData)

    }
    const inputCostDataHandler = ()=> {
        setFormVisible(true)
    }
    const cancelCostHandler = () => {
        setFormVisible(false)
    }
    return <div className="new-cost">
        {!formVisible && <button className="new-cost__actions" onClick={inputCostDataHandler}>Добавить Новый Расход</button>}
        {formVisible && <CostForm onSaveCostData={onSaveCostDataHandler} onCancel={cancelCostHandler}/>}
    </div>
}
export default NewCost;