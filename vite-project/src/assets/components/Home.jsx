import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import url from "../../details";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const storedUserName = localStorage.getItem("Id");

  const [buttonState, setButtonState] = useState(1);
  const [input, setInput] = useState("");

  const [response, setResponse] = useState(false);
  const [output, setOutput] = useState({});

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedValue = encodeURIComponent(input);

    if (buttonState === 1) {
      try {
        const result = await axios.post("/chatgpt", { prompt: input });
        setOutput(result.data.text);
      } catch (error) {
        console.error(error);
        setResponse(true);
        setOutput(
          "An error occurred while processing your request via Chat GPT"
        );
      }
    } else {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://api.stackexchange.com/2.3/search?order=asc&sort=votes&intitle=${encodedValue}&site=stackoverflow`
        );
        setResponse(true);
        setOutput(result.data.items);
        setLoading(false);

        if (result.data.items && result.data.items.length > 0) {
          const postData = {
            question: input,
          };

          // Make a POST request to another API
          const postResponse = await axios.post(
            `${url}history/addHistory?tempid=${storedUserName}`,
            postData
          );
          console.log("POST response from another API:", postResponse.data);
        }
      } catch (error) {
        console.error(error);
        setResponse(true);
        setOutput("An error occurred while fetching data from /stack");
      }
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="input" className="form-label">
            Enter Your Question
          </label>
          
          <textarea
            className="form-control question_area"
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="mb-3 buttons">
          <button
            className="btn btn-primary"
            onClick={() => {
              setButtonState(1);
            }}
            type="submit"
          >
            Chat GPT
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setButtonState(2);
            }}
            type="submit"
          >
            Stack Overflow
          </button>
        </div>
      </form>
      <div>
        {loading && (
          <div className="loading-circle">Loading...</div>
        )}
      </div>
      <div>
        {response && (
          <div>
            <h2>Output:</h2>
            <ul className="list-group">
              {output?.slice(0, 10).map((item, index) => (
                <li key={index} className="list-group-item">
                  <a href={item.link} rel="noopener noreferrer">
                    {item.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
