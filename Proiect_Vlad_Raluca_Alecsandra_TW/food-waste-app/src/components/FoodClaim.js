// FoodClaim.js
import React from 'react';

const FoodClaim = ({ foodList, onClaim }) => {
  return (
    <div className="food-claim-container">
      <h2>Listă de Alimente</h2>
      <ul>
        {foodList.map((food, index) => (
          <li key={index}>
            <span>{food.name} - {food.category}</span>
            {!food.claimed ? (
              <button onClick={() => onClaim(index)}>
                Revendică
              </button>
            ) : (
              <span className="claim-message">Produs revendicat!</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodClaim;
