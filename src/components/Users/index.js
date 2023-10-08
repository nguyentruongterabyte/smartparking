import { useState, useEffect } from 'react';
import axios from '~/utils/axios';

const LOGIN_USERS = 'loginUsers';

function Users() {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get(LOGIN_USERS, {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h1>Users List</h1>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user?.id}>{user?.username} </li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
