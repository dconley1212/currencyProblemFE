import "./App.css";
import React, { useState } from "react";

/* left off testing how the data might look when a user adds it
so that I can make a mock test of how I want to format the data
before sending to the api
*/

function App() {
  const [textAreaData, setTextAreaData] = useState([]);
  const handleTextArea = (e) => {
    setTextAreaData(e.target.value);
    console.log(textAreaData);
  };
  return (
    <div className="App">
      <form>
        <label>
          Upload your data
          <input type="file" />
        </label>
        <label>
          Add your data below
          <textarea onChange={handleTextArea} value={textAreaData}></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
