import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

/* I used the styling components library to grab the appriopriate
element and add the styling I created for it
*/

const StyledAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #85bb65;
  height: 100vh;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 50%;
  padding: 3rem 0rem;
  border: 1px solid #000000;
  margin-top: 3rem;
`;
const StyledLabel = styled.label`
  font-size: 1rem;
  margin: 1rem auto;
  font-weight: bold;
`;
const StyledInput = styled.input`
  margin-bottom: 1.5rem;
`;
const StyledTextArea = styled.textarea`
  padding: 3rem;
  margin-bottom: 1rem;
`;
const StyledButton = styled.button`
  padding: 1em 2em;
  width: 40%;
  border-radius: 10px;
  background-color: #85bb65;
  font-size: 1em;
`;

function App() {
  //Handling all the state that the user inputs whether throught the file upload
  // or the text area.
  const [textAreaObject, setTextAreaObject] = useState({
    textArea: "",
  });
  const [file, setFile] = useState(null);
  //handling the state that comes from the response of the api call
  const [maxProfit, setMaxProfit] = useState(null);

  /* the next two arrow functions handle the user actions when
   they upload a file or add to the text area which then is added
  to the state */
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const handleTextArea = (e) => {
    const arrayData = e.target.value.split(/\n/);

    console.log(arrayData);
    setTextAreaObject({ [e.target.name]: arrayData });
  };
  /* the arrow functin below handles the user clicking on the submit button
and sending a request to the api that should handle the request appriopriately
and send back a response but I couldn't handle the data the way I wanted to
for the text area. I kept getting a failure for the file axios call because of 
the information on my header not matching the multer requirements for the backend.
Additionally, I don't know if I was using the correct file format. Because I was just
trying to use a text file. It could have been necessary to use a .csv
*/
  const handleSubmit = (e) => {
    e.preventDefault();
    let fileInForm = new FormData();
    fileInForm.append("uploaded_file", file);
    if (file !== null) {
      axios
        .post("http://localhost:9000/file", fileInForm, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setMaxProfit(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:9000/textArea", textAreaObject, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setMaxProfit(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <StyledAppWrapper className="App">
      <h1>Finding Max Profit!</h1>
      <StyledForm
        aria-label="currency info"
        onSubmit={handleSubmit}
        data-testid="form"
      >
        <StyledLabel>Upload your data</StyledLabel>
        <StyledInput
          name="uploaded_file"
          type="file"
          onChange={handleFileUpload}
          data-testid="Upload Data"
        />
        <StyledLabel id="textArea">Add your data below</StyledLabel>
        <StyledTextArea
          data-testid="Add Data"
          id="textArea"
          name="textArea"
          onChange={handleTextArea}
          value={textAreaObject.textArea}
        ></StyledTextArea>
        <StyledButton>Submit</StyledButton>
      </StyledForm>
      {maxProfit !== null ? (
        <div>
          <h2>Buy low and sell high data:</h2>
          {Object.entries(maxProfit).map(([key, value]) => {
            return <p key={key}>{`${key}: ${JSON.stringify(value)}`}</p>;
          })}
        </div>
      ) : null}
    </StyledAppWrapper>
  );
}

export default App;
