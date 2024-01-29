import React, { useEffect, useState } from "react";
import NewCost from "./components/NewCost/NewCost";
import Costs from "./components/Costs/Costs";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Login/Login";

firebase.initializeApp({
  apiKey: "AIzaSyC5pb0VElz-O-Sf46aQPiaLQW1NTsM0mmM",
  authDomain: "cost-accounting-e285a.firebaseapp.com",
  projectId: "cost-accounting-e285a",
  storageBucket: "cost-accounting-e285a.appspot.com",
  messagingSenderId: "758749684151",
  appId: "1:758749684151:web:dbaf4ec788d4f0734b0832",
  measurementId: "G-M5BFPXQBT5",
});
const auth = firebase.auth();
// const firestore = firebase.firestore();

// const INITAIL_COSTS = [
//   {
//     id: "c1",
//     date: new Date(2024, 1, 20),
//     description: "Холодильник",
//     amount: 999.9,
//   },
//   {
//     id: "c2",
//     date: new Date(2023, 12, 25),
//     description: "MacBook",
//     amount: 1254.9,
//   },
//   {
//     id: "c3",
//     date: new Date(2024, 1, 1),
//     description: "Джинсы",
//     amount: 49.99,
//   },
// ];
const fetchValues = async (userId, setValues) => {
  const res = await fetch(
    "https://cost-accounting-e285a-default-rtdb.firebaseio.com/" +
      userId +
      ".json"
  );
  const resData = await res.json();
  const loadValues = [];
  for (const key in resData) {
    console.log(key);
    loadValues.push({
      amount: resData[key].amount,
      date: new Date(resData[key].date),
      description: resData[key].description,
      id: key,
    });
  }
  setValues(loadValues);
};

const App = () => {
  // firebase
  const [userId, setUserId] = useState(null);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user !== null && user !== undefined) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
  }, [user, userId]);
  // fetch get data
  const [values, setValues] = useState([]);
  useEffect(() => {
    if (userId == null) return;
    console.log("works");

    fetchValues(userId, setValues);
  }, [userId]);
  // post data

  const addCostHandler = async (cost) => {
    await fetch(
      "https://cost-accounting-e285a-default-rtdb.firebaseio.com/" +
        userId +
        ".json",
      {
        method: "Post",
        body: JSON.stringify({
          amount: cost.amount,
          description: cost.description,
          date: `${cost.date.getFullYear()},${
            cost.date.getMonth() + 1
          },${cost.date.getDate()}`,
        }),
      }
    );
    fetchValues(userId, setValues);
    // setValues((prevVal) => {
    //   return [cost, ...prevVal];
    // });
  };
  // remove Item handler
  const removeHandler = async (id) => {
    console.log("works");
    fetch(
      "https://cost-accounting-e285a-default-rtdb.firebaseio.com/" +
        userId +
        "/" +
        id +
        ".json",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setValues((prevVal) => {
          return prevVal.filter((val) => val.id !== id);
        });
      })
      .catch((err) => console.log(err));
  };
  // renameHandler item handler
  const renameHandler = async (id, cost) => {
    fetch(
      "https://cost-accounting-e285a-default-rtdb.firebaseio.com/" +
        userId +
        "/" +
        id +
        ".json",
      {
        method: "PUT",
        body: JSON.stringify({
          amount: cost.amount,
          description: cost.description,
          date: `${cost.date.getFullYear()},${
            cost.date.getMonth() + 1
          },${cost.date.getDate()}`,
        }),
      }
    );

    setValues((prevVal) => {
      let obj = prevVal.filter((val) => val === id);
      return [cost, ...obj];
    });
  };
  // Алтернативный подход разработки.Нужно импортировать React
  // return React.createElement('div', {},React.createElement('h1',{},'Начнем нашу разработку!'),React.createElement(Costs,{costs:costs}))
  return user ? (
    <div>
      <button className={"btn_signout"} onClick={() => auth.signOut()}>
        Sign Out
      </button>
      <NewCost addCost={addCostHandler} />
      <Costs
        costs={values}
        userId={userId}
        removeHandler={removeHandler}
        renameHandler={renameHandler}
      />
    </div>
  ) : (
    <Login firebase={firebase} auth={auth} />
  );
};

export default App;
