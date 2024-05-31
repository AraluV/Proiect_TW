import React, { useState, useEffect } from 'react';
import './FoodList.css';

const FoodList = () => {
  const [foodList, setFoodList] = useState([]);
  const [category, setCategory] = useState('lactate');
  const [foodItem, setFoodItem] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const addFoodItem = () => {
    if (!category || !foodItem || !expirationDate) {
      alert('Vă rugăm să completați toate câmpurile.');
      return;
    }

    const today = new Date();
    const expiration = new Date(expirationDate);

    if (expiration <= today) {
      alert(`Atenție! Data de expirare pentru "${foodItem}" din categoria "${category}" este în trecut.`);
      return;
    }

    setFoodList((prevFoodList) => [
      ...prevFoodList,
      { category, foodItem, expirationDate, isAvailable: true, claimer: null }, // Adăugare câmp claimer
    ]);

    setCategory('lactate');
    setFoodItem('');
    setExpirationDate('');

    const requestData = {
      name: foodItem,
      expirationDate: expirationDate,
    };

    console.log(requestData);

    const response = fetch('http://localhost:7000/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

    // try {
    //   // Make the POST request to the server
    //   const response = await fetch('http://localhost:7000/foods', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestData),
    //   });

    // } catch(err) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
  };

  const updateAvailability = (index, newAvailability) => {
    setFoodList((prevFoodList) => {
      const updatedFoodList = [...prevFoodList];
      if (updatedFoodList[index].isAvailable) {
        updatedFoodList[index].isAvailable = newAvailability;
        updatedFoodList[index].claimer = null; // Resetarea claimer-ului la dezactivarea disponibilității
      }
      return updatedFoodList;
    });
  };

  const claimFood = (index) => {
    const claimerName = prompt('Introduceți numele pentru claim:');
    if (claimerName) {
      setFoodList((prevFoodList) => {
        const updatedFoodList = [...prevFoodList];
        updatedFoodList[index].claimer = claimerName;
        updatedFoodList[index].isAvailable = false; // Setare automată la "not available" când este revendicat
        return updatedFoodList;
      });
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setFoodList((prevFoodList) =>
        prevFoodList.map((food) => {
          const now = new Date();
          const expiration = new Date(food.expirationDate);
          const difference = expiration - now;

          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return {
              ...food,
              countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`,
            };
          } else {
            return {
              ...food,
              countdown: 'Expired',
              isAvailable: false,
            };
          }
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Anti Food Waste App</h1>
      </header>
      <section id="add-food-form">
        <form>
          <label htmlFor="category">Categorie</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="lactate">Lactate</option>
            <option value="carne">Carne</option>
            <option value="legume">Legume</option>
            <option value="fructe">Fructe</option>
          </select>

          <label htmlFor="foodItem">Aliment</label>
          <input type="text" id="foodItem" value={foodItem} onChange={(e) => setFoodItem(e.target.value)} placeholder="Inserează aliment" required />

          <label htmlFor="expirationDate">Expirare</label>
          <input
            type="datetime-local"
            id="expirationDate"
            min={new Date().toISOString().split('T')[0]}
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />

          <button type="button" onClick={addFoodItem}>
            Adaugă Aliment
          </button>
        </form>
      </section>
      <section id="food-list">
        <table>
          <thead>
            <tr>
              <th>Categorie</th>
              <th>Aliment</th>
              <th>Data expirării</th>
              <th>Ora expirării</th>
              <th>Timp rămas</th>
              <th>Disponibilitate</th>
              <th>Claimer</th>
              <th>Claim</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food, index) => (
              <tr key={index}>
                <td>{food.category}</td>
                <td>{food.foodItem}</td>
                <td>{new Date(food.expirationDate).toLocaleDateString()}</td>
                <td>{new Date(food.expirationDate).toLocaleTimeString()}</td>
                <td>{food.isAvailable ? food.countdown : 'N/A'}</td>
                <td>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={foodList[index].isAvailable}
                      onChange={() => updateAvailability(index, !foodList[index].isAvailable)}
                    />
                    {foodList[index].isAvailable ? (
                      <span className="available">Disponibil</span>
                    ) : (
                      <span className="not-available">Indisponibil</span>
                    )}
                  </label>
                </td>
                <td>{food.claimer || 'N/A'}</td>
                <td>
                  {food.isAvailable ? (
                    <button onClick={() => claimFood(index)}>Claim</button>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default FoodList;
