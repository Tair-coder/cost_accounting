import Card from "../UI/Card";
import CostDate from "./CostDate";
import "./CostItem.css";
import basket from "../image/basket.svg";
import rename from "../image/rename.svg";
import { useRef, useState } from "react";
const CostItem = (props) => {
  const newName = useRef();
  const newAmount = useRef();
  const newDate = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (
      newName.current.value.trim().length === 0 ||
      newAmount.current.value.trim().length === 0 ||
      newAmount.current.value.trim().length === 0
    )
      return console.log(newDate.current.value.length);
    props.renameHandler(props.id, {
      id: props.id,
      description: newName.current.value,
      amount: newAmount.current.value,
      date: new Date(newDate.current.value),
    });
    setIsNameRenaming(false);
  };
  const [isNameRenaming, setIsNameRenaming] = useState(false);
  return (
    <li>
      <Card className="cost-item">
        <CostDate date={props.date} />

        {isNameRenaming ? (
          <div className="cost-item__description">
            <form
              className="cost-item__rename-form"
              onSubmit={submitFormHandler}
            >
              <input
                className="cost-item__input"
                placeholder="Введите название"
                ref={newName}
              />
              <input
                className="cost-item__input"
                placeholder="Введите сумму"
                type="number"
                min="0.01"
                step="0.01"
                ref={newAmount}
              />
              <input
                className="cost-item__input"
                placeholder="Введите новую дату"
                type="date"
                min="2019-01-01"
                step="2024-01-01"
                ref={newDate}
              />
              <button type="submit" className="cost-item__btn-confirm">
                Потвердить изменения
              </button>
              <button
                type="button"
                className="cost-item__btn-cancel"
                onClick={() => setIsNameRenaming(false)}
              >
                Отменить изменения
              </button>
            </form>
          </div>
        ) : (
          <div className="cost-item__description">
            <h2>{props.description}</h2>
            <span className="cost-item__others">
              <div className="cost-item__price">${props.amount}</div>
              <button
                className="cost-item__del-btn"
                onClick={() => props.removeHandler(props.id)}
              >
                <img src={basket} alt="Корзина" />
              </button>
              <button className="cost-item__rename-btn">
                <img
                  src={rename}
                  alt="Переназвать"
                  onClick={() => setIsNameRenaming(true)}
                />
              </button>
            </span>
          </div>
        )}
      </Card>
    </li>
  );
};
export default CostItem;
