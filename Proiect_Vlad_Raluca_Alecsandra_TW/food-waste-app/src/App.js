import React, { useState } from 'react';
import FoodList from './components/FoodList';
import './components/GroupList.css';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newFriendName, setNewFriendName] = useState('');
  const [friendCategory, setFriendCategory] = useState('');
  const [invitations, setInvitations] = useState([]);

  const addGroup = () => {
    if (newGroupName.trim() !== '') {
      setGroups([...groups, { name: newGroupName, friends: [] }]);
      setNewGroupName('');
    }
  };

  const addFriendToGroup = (groupName) => {
    if (newFriendName.trim() !== '') {
      const updatedGroups = groups.map((group) =>
        group.name === groupName
          ? {
              ...group,
              friends: [
                ...group.friends,
                { name: newFriendName, category: friendCategory, invited: false },
              ],
            }
          : group
      );

      setGroups(updatedGroups);
      setNewFriendName('');
      setFriendCategory('');
    }
  };

  const inviteToFoodList = (groupName, friendIndex) => {
    const updatedGroups = groups.map((group) =>
      group.name === groupName
        ? {
            ...group,
            friends: group.friends.map((friend, index) =>
              index === friendIndex
                ? { ...friend, invited: true, invitationMessage: 'Invitație trimisă către lista de alimente!' }
                : friend
            ),
          }
        : group
    );
  
    setGroups(updatedGroups);
    setInvitations([...invitations, updatedGroups.find((group) => group.name === groupName).friends[friendIndex]]);
  };
  
  

  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="main-container">
        {/* Componenta FoodList */}
        <FoodList />

        <div className="group-list-container">
          <h1 className="group-title">Lista de Grupuri</h1>

          <div>
            <label>
              Numele Grupului:
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </label>
            <button onClick={addGroup}>Adauga Grup</button>
          </div>

          <ul>
            {groups.map((group) => (
              <li key={group.name}>
                <h3>{group.name}</h3>
                <ul>
                {group.friends.map((friend, index) => (
  <li key={index}>
    {friend.invited ? (
      <>
        <span role="img" aria-label="Star">
          ⭐
        </span>{' '}
        {friend.name} - {friend.category}{' '}
        <span className="invitation-message">Invitație trimisă către lista de alimente!</span>
      </>
    ) : (
      <>
        <span role="img" aria-label="Dot">
          🔵
        </span>{' '}
        {friend.name} - {friend.category}{' '}
        <button onClick={() => inviteToFoodList(group.name, index)}>
          Trimite Invitație
        </button>
      </>
    )}
  </li>
))}

                </ul>
                <div>
                  <label>
                    Numele Prietenului:
                    <input
                      type="text"
                      value={newFriendName}
                      onChange={(e) => setNewFriendName(e.target.value)}
                    />
                  </label>
                  <label>
                    Categorie:
                    <input
                      type="text"
                      value={friendCategory}
                      onChange={(e) => setFriendCategory(e.target.value)}
                    />
                  </label>
                  <button onClick={() => addFriendToGroup(group.name)}>
                    Adauga Prieten
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default App;
