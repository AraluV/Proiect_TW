// components/GroupList/GroupList.js
import React, { useState } from 'react';
import FriendList from './components/FriendList';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');

  const addGroup = () => {
    if (newGroupName.trim() !== '') {
      setGroups([...groups, { name: newGroupName, friends: [] }]);
      setNewGroupName('');
    }
  };

  const addFriendToGroup = (groupName, friendName) => {
    const updatedGroups = groups.map((group) =>
      group.name === groupName
        ? { ...group, friends: [...group.friends, friendName] }
        : group
    );

    setGroups(updatedGroups);
  };

  return (
    <div>
      <h1>Group List</h1>

      <div>
        <label>
          Group Name:
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </label>
        <button onClick={addGroup}>Add Group</button>
      </div>

      {/* Componenta FriendList este inclusă aici și primește funcția addFriendToGroup */}
      <FriendList groups={groups.map((group) => group.name)} onAddFriend={addFriendToGroup} />

      <ul>
        {groups.map((group) => (
          <li key={group.name}>
            <h3>{group.name}</h3>
            <ul>
              {group.friends.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
