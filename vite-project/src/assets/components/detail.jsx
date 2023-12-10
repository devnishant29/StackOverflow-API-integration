import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./detail.css"

import axios from "axios";
const detail = () => {
  const location = useLocation();
  const [output, setOutput] = useState({});
  const [loading, setLoading] = useState(true);
  const { question } = location.state;
  const encodedValue = encodeURIComponent(question);
  console.log(encodedValue);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await axios.get(
        `https://api.stackexchange.com/2.3/search?order=asc&sort=votes&intitle=${encodedValue}&site=stackoverflow`
      );
      setLoading(false);
      console.log(result.data);
      setOutput(result.data.items);
    };

    fetchApi();
  }, []);

  console.log(output);
  return (
    <div>
      <div>
        {!loading && (
          <div >
            <h2>Output:</h2>
            <ul className="list-group">
              {output?.slice(0, 10).map((item, index) => (
                <><div className="div-item">
                  <li key={index} className="list-group-item">
                    <p className="detail-title">
                      {item.title}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        link
                      </a>
                    </p>
                    
                    <div className="mytag">
                    <ul className="Tag">
                      
                      {item.tags.map((tag, idx) => (
                        <li key={idx} id="Tag">
                          <p>{tag}</p>
                        </li>
                        
                      ))}
                    </ul>
                    </div>
                  </li>

                </div><hr /></>
              ))}
              
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default detail;
