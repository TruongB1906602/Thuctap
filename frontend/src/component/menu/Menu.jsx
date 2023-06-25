import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [foods, setFoods] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("/api/foods")
      .then((response) => setFoods(response.data))
      .catch((error) => console.log(error));

    axios
      .get("/api/tables")
      .then((response) => setTables(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleFoodChange = (event) => {
    const foodId = event.target.value;
    const food = foods.find((food) => food._id === foodId);
    const quantity = parseInt(event.target.dataset.quantity);

    const existingItem = orderItems.find((item) => item.food._id === foodId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = {
        food,
        quantity,
      };
      setOrderItems([...orderItems, newItem]);
    }

    setTotal(total + food.price * quantity);
  };

  const handleRemoveItem = (index) => {
    const removedItem = orderItems[index];
    const newItems = orderItems.filter((item, i) => i !== index);
    setOrderItems(newItems);
    setTotal(total - removedItem.food.price * removedItem.quantity);
  };

  const handleSubmitOrder = () => {
    if (!selectedTable) {
      alert("Please select a table.");
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add some items to the order.");
      return;
    }

    const order = {
      table: selectedTable,
      items: orderItems,
      total,
    };

    axios
      .post("/api/orders", order)
      .then((response) => {
        alert("Order placed successfully.");
        setSelectedTable("");
        setOrderItems([]);
        setTotal(0);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Order Food</h1>
      <div>
        <label htmlFor="table">Select Table: </label>
        <select id="table" value={selectedTable} onChange={handleTableChange}>
          <option value="">-- Select Table --</option>
          {tables.map((table) => (
            <option key={table._id} value={table._id}>
              Table {table.number}
            </option>
          ))}
        </select>
      </div>
      <h2>Menu</h2>
      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            <h3>{food.name}</h3>
            <p>Price: ${food.price}</p>
            <p>{food.description}</p>
            <div>
              <button
                onClick={handleFoodChange}
                value={food._id}
                data-quantity={1}
              >
                Add 1
              </button>
              <button
                onClick={handleFoodChange}
                value={food._id}
                data-quantity={-1}
              >
                Remove 1
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Order Summary</h2>
      {orderItems.length === 0 ? (
        <p>No items in the order.</p>
      ) : (
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              <h3>{item.food.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${item.food.price * item.quantity}</p>
              
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${total}</p>
      <button onClick={handleSubmitOrder}>Place Order</button>
    </div>
  );
}

export default App;
