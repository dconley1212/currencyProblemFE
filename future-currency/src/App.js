import "./App.css";
import React, { useState } from "react";
import axios from "axios";

/* left off testing how the data might look when a user adds it
so that I can make a mock test of how I want to format the data
before sending to the api
*/

function App() {
  const [formObject, setFormObject] = useState({
    file: null,
    textArea: "",
  });

  const handleFileUpload = (e) => {
    setFormObject({
      [e.target.name]: e.target.files[0],
      ...formObject,
    });
  };
  const handleTextArea = (e) => {
    const arrayData = e.target.value.split(/\n/);

    console.log(arrayData);
    setFormObject({ ...formObject, [e.target.name]: arrayData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formObject);
    axios
      .post("http://localhost:9000/price/difference", formObject)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <form aria-label="currency info" onSubmit={handleSubmit}>
        <label>
          Upload your data
          <input name="file" type="file" onChange={handleFileUpload} />
        </label>
        <label id="textArea">
          Add your data below
          <textarea
            id="textArea"
            name="textArea"
            onChange={handleTextArea}
            value={formObject.textArea}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
