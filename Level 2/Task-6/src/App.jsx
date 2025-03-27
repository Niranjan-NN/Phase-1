import React from "react";
import Details from "./Details";

const DetailsContainer = () => {

  const users = [
    { name: "Pradeep", age: "30", city: "Ciombatore" }, 
    { name: "Rooban", age: "25", city: "Bangalore" },
    { name: "Ganesan", age: "28", city: "Thirunelveli" },
  ];

  return (
    <div>
      <h2>User Information</h2>
      {users.map((user, index) => (
        <UserDetails key={index} name={user.name} age={user.age} city={user.city} />
      ))}
    </div>
  );
};

export default Details;
