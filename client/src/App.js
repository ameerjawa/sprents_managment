// client/src/App.js

import React from "react";
import "./App.css";
import HomePage from "./views/HomePage"

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/add_tutorial")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
