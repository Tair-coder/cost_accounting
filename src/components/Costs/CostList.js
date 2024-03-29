import "./CostList.css";
import CostItem from "./CostItem";
const CostList = (props) => {
  if (props.costs.length === 0) {
    return <h2 className="cost-list__fallback">В Этом Году Расходов Нет</h2>;
  }
  return (
    <ul className="cost-list">
      {props.costs.map((cost) => (
        <CostItem
          removeHandler={props.removeHandler}
          renameHandler={props.renameHandler}
          key={cost.id}
          id={cost.id}
          date={cost.date}
          description={cost.description}
          amount={cost.amount}
        />
      ))}
    </ul>
  );
};
export default CostList;
