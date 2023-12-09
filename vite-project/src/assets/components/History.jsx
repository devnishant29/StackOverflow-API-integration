import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import url from "../../details";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const navigate=useNavigate();

  const storedUserName = localStorage.getItem("Id");
  const [historyData, setHistoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}history/getHistoryById?userId=${storedUserName}`);
        console.log(response.data);
        setHistoryData(response.data.data);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleClick = async (question) => {
    // Make another API call when clicking on a specific item
    try {



      // navigate(
      //   'thepath',
      //   {
      //     state: {
      //     }
      //   }
      // })





      navigate("/detail" , {state:{question}})
      // const response = await axios.get(`${url}/history/${itemId}`);
      // Process the response as needed
      // console.log("Additional API call response:", response.data);

      // You can update the state or perform any other action based on the response
    } catch (error) {
      console.error("Error making additional API call:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>History</h1>
      <ul className="list-group">
        {historyData.map((item) => (
          <li
            key={item._id}
            className={`list-group-item ${selectedItem === item._id ? "active" : ""}`}
            onClick={() => {
              setSelectedItem(item._id);
              handleClick(item.question);

            }}
          >
            {item.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
