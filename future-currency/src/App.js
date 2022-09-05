import "./App.css";
import React, { useState } from "react";
import axios from "axios";

/* left off testing how the data might look when a user adds it
so that I can make a mock test of how I want to format the data
before sending to the api
*/

function App() {
  const [textAreaData, setTextAreaData] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const handleTextArea = (e) => {
    console.log(e.target.value);
    setTextAreaData(e.target.value);
    const arrayData = textAreaData.split(/\n/);
    console.log(arrayData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:9000/price/difference", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    if (file === null && textAreaData.length > 0) {
      axios
        .post("http://localhost:9000/price/difference", textAreaData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Upload your data
          <input type="file" onChange={handleFileUpload} />
        </label>
        <label id="textarea">
          Add your data below
          <textarea
            id="textarea"
            name="data"
            onChange={handleTextArea}
            value={textAreaData}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
