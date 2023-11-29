import { useLocation } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { showAllUsers } from '../api/usersUtils';
import UserInfo from './UserInfo';

export default function UserSearch() {
  let query = useQuery();
  const searchText = query.get('s');
  const [searchedUsers, setSearchedUsers] = useState([]);
  useEffect(() => {
    const users = showAllUsers();
    users.then((val) => {
      // console.log(val);
      let newUsers = [];
      for (let i in val) {
        let user = val[i];
        if (isInText(searchText, user.username)) {
          newUsers.push(user);
        }
      }
      setSearchedUsers(newUsers);
    });
  }, []);
  return (
    <>
      <h1>Search results:</h1>
      {searchedUsers.map((user) => {
        return (
          <UserInfo key={user._id} _id={user._id} username={user.username} />
        );
      })}
    </>
  );
  //console.log(searchedUsers);
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function isInText(query, text) {
  //console.log(text);
  return text.toLowerCase().includes(query.toLowerCase());
}
