// CashRegister.js
import React, { useState } from 'react';
import './index.css';

const CashRegister = () => {
  const [register, setRegister] = useState({
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0,
  });

  const updateRegister = (denomination, count) => {
    setRegister({ ...register, [denomination]: register[denomination] + count });
  };

  const getTotal = () => {
    let total = 0;
    for (const denom in register) {
      total += denom * register[denom];
    }
    return total;
  };

  const handleAddMoney = (denomination, count) => {
    updateRegister(denomination, count);
  };

  const handleTakeMoney = (denomination, count) => {
    if (register[denomination] >= count) {
      updateRegister(denomination, -count);
    } else {
      alert(`Not enough $${denomination} bills in the register.`);
    }
  };

  const handleDispenseChange = (amount) => {
    const change = { 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 };
    let remainingAmount = amount;

    for (const denom in change) {
      const billValue = parseInt(denom);
      while (remainingAmount >= billValue && register[denom] > 0) {
        remainingAmount -= billValue;
        change[denom]++;
        updateRegister(billValue, -1);
      }
    }

    if (remainingAmount === 0) {
      alert('Change dispensed successfully.');
    } else {
      alert('Cannot make the requested change with available bills.');
    }
  };

  return (
    <div className="cash-register">
      <h1>Cash Register</h1>
      <h2>FMS is so dope, we have a cash register now!</h2>
      <div className="register-status">
        <h3>Register Status</h3>
        <p>Total: ${getTotal()}</p>
        {Object.keys(register).map((denomination) => (
          <p key={denomination}>
            {denomination}x{register[denomination]}
          </p>
        ))}
      </div>
      <div className="actions">
        <div>
          <h3>Add Bills</h3>
          <button onClick={() => handleAddMoney(20, 2)}>Add 2x $20</button>
          <button onClick={() => handleAddMoney(10, 4)}>Add 4x $10</button>
          <button onClick={() => handleAddMoney(5, 6)}>Add 6x $5</button>
          <button onClick={() => handleAddMoney(2, 4)}>Add 4x $2</button>
          <button onClick={() => handleAddMoney(1, 10)}>Add 10x $1</button>
        </div>
        <div>
          <h3>Remove Bills</h3>
          <button onClick={() => handleTakeMoney(20, 1)}>Remove 1x $20</button>
          <button onClick={() => handleTakeMoney(10, 4)}>Remove 4x $10</button>
          <button onClick={() => handleTakeMoney(5, 3)}>Remove 3x $5</button>
          <button onClick={() => handleTakeMoney(1, 10)}>Remove 10x $1</button>
        </div>
      </div>
      <div className="change">
        <h3>Get Change</h3>
        <input type="number" placeholder="Enter amount" />
        <button onClick={() => handleDispenseChange(0)}>Get Change</button>
      </div>
    </div>
  );
};

export default CashRegister;
