import logo from "../logo.png";
import profile from "../mypicture.png";
import "bootstrap/dist/css/bootstrap.css";

import { useEffect, useState } from "react";
import { API_URI } from "../shared/constants";

function ElementMaker(props) {
  return (
    // Render a <span> element
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <input
            type="text"
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            style={{
              display: "inline-block",
              height: "25px",
              minWidth: "300px",
            }}
            a
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

function Calculator() {
  const [fullName, setFullName] = useState("Sarika Bhoomreddy");
  const [desc, setDesc] = useState(
    "i am sarika bhoomreddy currently pursuing my masters in computer science , i have worked as software developer who constantly seeks out innovative solutions to everyday problems. i completed my undergraduation in computer science and engineering with 7.6 as cgpa. thank you"
  );

  const [showInputEle, setShowInputEle] = useState(false);
  const [showInputEle2, setShowInputEle2] = useState(false);

  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [sum, setSum] = useState(0);

  const [esum, setESum] = useState();

  const doSum = (e) => {
    setSum(Number(num1) + Number(num2));

    fetch(`${API_URI}/calc/` + num1 + "/add/" + num2)
      .then((response) => response.text())
      .then((data) => {
        setESum(data);
      });
  };
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt=""
              width="25"
              height="25"
              className="d-inline-block align-top"
            />
            Media library
          </a>
        </div>
      </nav>
      <div className="container-fluid ">
        <div className="row">
          <div className="col col-md-auto ">
            <img
              src={profile}
              alt=""
              width="300"
              height="300"
              className="d-inline-block align-text-top"
            />
          </div>
          <div className="col p-10 g-4">
            <h3>
              <ElementMaker
                value={fullName}
                handleChange={(e) => setFullName(e.target.value)}
                handleDoubleClick={() => setShowInputEle(true)}
                handleBlur={() => setShowInputEle(false)}
                showInputEle={showInputEle}
              />
            </h3>
            <ElementMaker
              value={desc}
              handleChange={(f) => setDesc(f.target.value)}
              handleDoubleClick={() => setShowInputEle2(true)}
              handleBlur={() => setShowInputEle2(false)}
              showInputEle={showInputEle2}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="row d-flex align-items-center p-4">
          <div className="col-lg-3">
            <label className="col-form-label">Enter First Number</label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              name="num1"
              className="form-control"
              onChange={(e) => {
                setNum1(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row align-items-center p-4">
          <div className="col-lg-3">
            <label className="col-form-label">Enter Second Number</label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              name="num2"
              className="form-control"
              onChange={(e) => {
                setNum2(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="text-left p-4">
          <button type="button" onClick={doSum} className="btn btn-primary p-2">
            Submit
          </button>

          <h5>Your Addition Result(from Server) is:{esum}</h5>
          <h5>Your Addition Result(from ReactJS) is: {sum}</h5>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
