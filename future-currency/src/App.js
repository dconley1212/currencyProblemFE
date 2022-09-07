import "./App.css";
import React, { useState } from "react";
import axios from "axios";

/* left off testing how the data might look when a user adds it
so that I can make a mock test of how I want to format the data
before sending to the api
*/

function App() {
  const [textAreaObject, setTextAreaObject] = useState({
    textArea: "",
  });

  let fileInForm = new FormData();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    fileInForm.append("file", file);
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   console.log(e.target.result);
    // };
    // const fileAsText = reader.readAsText(file);
    // console.log(fileAsText);
    // console.log(formObject.file);
  };
  const handleTextArea = (e) => {
    const arrayData = e.target.value.split(/\n/);

    console.log(arrayData);
    setTextAreaObject({ [e.target.name]: arrayData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textAreaObject.textArea.length === 0) {
      axios
        .post("http://localhost:9000/price/difference", fileInForm)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:9000/price/difference", textAreaObject)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
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
            value={textAreaObject.textArea}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
      {}
    </div>
  );
}

export default App;
