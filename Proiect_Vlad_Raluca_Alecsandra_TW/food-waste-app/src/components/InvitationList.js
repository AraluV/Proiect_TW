// components/InvitationList.js
import React from 'react';

const InvitationList = ({ invitations }) => {
  return (
    <div>
      <h2>Invitații</h2>
      <ul>
        {invitations.map((invitation, index) => (
          <li key={index}>{invitation}</li>
        ))}
      </ul>
    </div>
  );
};

export default InvitationList;
