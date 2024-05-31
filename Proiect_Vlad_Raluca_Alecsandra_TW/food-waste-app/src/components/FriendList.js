// components/FriendList/FriendList.js
import React, { useState } from 'react';

const FriendList = ({ groups, onAddFriend }) => {
  const [friendName, setFriendName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleAddFriend = () => {
    if (!friendName || !selectedGroup) {
      alert('Please fill in all fields.');
      return;
    }

    // Apelarea funcției de adăugare a prietenului în grupul selectat din componenta părinte
    onAddFriend(selectedGroup, friendName);

    // Resetarea valorilor input-urilor după adăugare
    setFriendName('');
    setSelectedGroup('');
  };

  return (
    <div>
      <h2>Friend List</h2>
      <label htmlFor="friendName">Friend Name:</label>
      <input
        type="text"
        id="friendName"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="Enter friend name"
        required
      />

      <label htmlFor="group">Select Group:</label>
      <select
        id="group"
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        required
      >
        <option value="">Select a group</option>
        {groups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>

      <button type="button" onClick={handleAddFriend}>
        Add Friend
      </button>
    </div>
  );
};

export default FriendList;
