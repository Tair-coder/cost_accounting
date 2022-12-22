import React,{useState} from 'react';
import './CostForm.css'

const CostForm = (props) => {
    // const [userInput,setUserInput] = useState({
    //     name:'',
    //     amount:'',
    //     date:'',
    // })
    const [name,setName] = useState('')
    const [amount,setAmount] = useState('')
    const [date,setDate] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()

        const costData = {
            description:name,
            amount:amount,
            date:new Date(date),
        }
        props.onSaveCostData(costData)
        setName('');
        setAmount('');
        setDate('');
    } 
    const nameChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput,
        //     name:event.target.value
        // })
        // setUserInput((previousValue) => {
        //     return{
        //     ...previousValue,
        //     name:event.target.value,
        //     }
        // })
        setName(event.target.value)
    };
    const amountChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput,
        //     amount:event.target.value
        // })
        setAmount(event.target.value)
    };
    const dateChangeHandler = (event) => {
        // setUserInput({
        //     ...userInput,
        //     date:event.target.value
        // })
        setDate(event.target.value)
    };        
    const cancelCostHandler = ()=> {
        props.onCancel()
    }
    return (
        <form onSubmit={submitHandler}>
        <div className="new-cost__controls">
            <div className="new-cost__controls">
                <label>Название</label>
                <input type='text' value={name} onChange={nameChangeHandler}/>
            </div>
            <div className="new-cost__controls">
                <label>Сумма</label>
                <input type='number' value={amount} onChange={amountChangeHandler} min='0.01' step='0.01'/>
            </div>
            <div className="new-cost__controls">
                <label>Дата</label>
                <input type='date' value={date} onChange={dateChangeHandler} min='2019-01-01' step='2022-12-31'/>
            </div>
            <div className="new-cost__actions">
                <button type='submit'>Добавить расход</button>
                <button type='button' onClick={cancelCostHandler}>Отмена</button>
            </div>
        </div>
    </form> 
    
    )}
export default CostForm