import React,{useState} from 'react'
import './Costs.css';
import Card from '../UI/Card';
import CostsFilter from './CostsFilter';
import CostList from './CostList';
import CostsDiagram from './CostsDiagram';

function Costs(props){

    const [selectedYear,setSelectedYear] = useState('2021') 

    const onChangeYearHandler = (year) => {
        setSelectedYear(year)
    }
    const filteredCosts = props.costs.filter(cost => {
      return cost.date.getFullYear().toString() === selectedYear
    });

    
    return(
        <div>
        <Card className="costs">
           <CostsFilter year={selectedYear} onChangeYear={onChangeYearHandler}/>
           <CostsDiagram costs={filteredCosts}/>
           <CostList costs={filteredCosts}/>
           </Card>   
    </div>
        // Мой вариант <CostItem date={props.date} description ={props.description} amount={props.amount}/> 
    )
}
export default Costs