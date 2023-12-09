import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
          <div>
            <h2>Output:</h2>
            <ul className="list-group">
              {output?.slice(0, 10).map((item, index) => (
                <li key={index} className="list-group-item">
                  <p>
                    {item.title}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      link
                    </a>
                  </p>
                  <ul>
                    <p>Tag:</p>
                {item.tags.map((tag, idx) => (
                  <li key={idx}>
                    <p>{tag}</p>
                  </li>
                ))}
              </ul>
               
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default detail;
