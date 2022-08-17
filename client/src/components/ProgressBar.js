import React, { useState } from "react";
import "../App.css";

export default function ProgressBar(props) {
  const [count, setStep] = useState(1);
  let total = [1, 2, 3, 4];

  if (props.pageNo !== count) {
    setStep(props.pageNo);
  }

  return (
    <div>
      <ul id="progressbar" className="text" style={{ textAlign: "center" }}>
        {total.map((step, id) => (
          <>
            <li
              id={"step" + (id + 1)}
              className={id + 1 <= count ? "active" : null}
            >
              {id === 0
                ? "What you want to do?"
                : id === 1
                ? "Choose the Product"
                : id === 2
                ? "Campaign Settings"
                : id === 3
                ? "Ready to Go"
                : null}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
