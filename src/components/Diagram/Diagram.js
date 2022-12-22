import DiagramBar from './DiagramBar';
import './Diagram.css'
const Diagram = (props)=> {
    const dataSetsValue = props.dataSets.map(dataSet => (
        dataSet.value
    ))
    const maxMonthCosts = Math.max(...dataSetsValue)
    for (let i = 0; i < props.dataSets.length; i++) {
        localStorage.setItem(props.dataSets[i].label,props.dataSets[i].value)
    }

        
    return <div className='diagram'> 
        {props.dataSets.map( dataSet=> (<DiagramBar key={dataSet.label} value={dataSet.value} maxValue={maxMonthCosts} 
        label={dataSet.label}/>))}
    </div>
}
export default Diagram