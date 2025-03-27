import React from "react";
import Details from "./Details";

function App() {
  return (
    <div>
      <Details name="Pradeep" age={30} city="Coimbatore" />
      <Details name="Rooban" age={25} city="Bangalore" />
      <Details name="Ganesan" age={28} city="Thirunelveli" />
    </div>
  );
}

export default App;
