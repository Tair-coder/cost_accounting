import React,{useState} from "react";
import NewCost from "./components/NewCost/NewCost";
import Costs from "./components/Costs/Costs";

const INITAIL_COSTS = [
  {
    id:'c1',
    date:new Date(2021,2,12),
    description:'Холодильник',
    amount: 999.9,
  },
  {
    id:'c2',
    date:new Date(2021,11,25),
    description:'MacBook',
    amount: 1254.9,
  },
  {
    id:'c3',
    date:new Date(2021,4,1),
    description:'Джинсы',
    amount: 49.99,
  }
]

const App = () => {
  const [costs,setCosts] = useState(INITAIL_COSTS)

  const addCostHandler = (cost) =>{
    setCosts((prevCosts)=> {
      return[cost,...prevCosts]
    })} 

  // Алтернативный подход разработки.Нужно импортировать React
  // return React.createElement('div', {},React.createElement('h1',{},'Начнем нашу разработку!'),React.createElement(Costs,{costs:costs}))
  return (
    <div>
      <NewCost addCost ={addCostHandler}/>
      <Costs costs={costs} />
{/* Мой вариант <div className="costs">
      <Costs date={costs[0].date} description={costs[0].description} amount={costs[0].amount}/>
      <Costs date={costs[1].date} description={costs[1].description} amount={costs[1].amount}/>
      <Costs date={costs[2].date} description={costs[2].description} amount={costs[2].amount}/> 
      </div> */}
    </div>
  );
}

export default App;
