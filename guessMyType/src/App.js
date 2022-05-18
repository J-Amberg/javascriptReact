import "./App.css";
import { useState } from "react";
import Important from "./Important";

function App() {
  const [userInput, setUserInput] = useState();
  const [userType, setUserType] = useState("undefined");
  const findType = (value) => {
    for (let i = 0; i < value.length; i++) {
      let asciiValue = value.codePointAt(i);
      if (asciiValue < 48 || asciiValue > 57) {
        break;
      }
      if (i == value.length - 1) {
        setUserType("integer");
        return;
      }
    }
    for (let i = 0; i < value.length; i++) {
      let asciiValue = value.codePointAt(i);
      if (asciiValue < 42 || asciiValue > 57) {
        break;
      }
      if (i == value.length - 1) {
        setUserType("double");
        return;
      }
    }
    if (value == "") setUserType("undefined");
    else if (value == "true" || value == "false") return setUserType("boolean");
    else setUserType("string");
  };

  return (
    <div className="moreThanApp">
      {userType != "undefined" && (
        <div className="itsALifeStyle">
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
          <Important userType={userType}></Important>
        </div>
      )}

      <div className="App">
        <div className="inputBox">
          <input
            placeholder="type something"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              findType(e.target.value);
            }}
          />
        </div>
        {userType == "undefined" && (
          <div className="userType">
            <h1>{userType}</h1>
          </div>
        )}
      </div>
      <div className="itsALifeStyle"></div>
    </div>
  );
}

export default App;
