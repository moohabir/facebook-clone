import { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001').then((response) => {
      console.log(response);
      setUsers(response.data);
    });
  }, []);

  const CreateUsers = async () => {
    await axios
      .post('http://localhost:3001/users/register', { name, email, password })
      .then((response) => {
        console.log(response);

        setUsers([...users, { name, email, password }]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  //CreateUsers();
  return (
    <div>
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="age"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="username"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          onClick={CreateUsers}
          style={{ height: '40px', width: '70px', marginLeft: '5px' }}
        ></button>
      </div>
      <h1>Get Users from MERN</h1>
      {users.map((user, id) => (
        <div key={user._id}>
          <h4>Name: {user.username} </h4>
          <h4>Age: {user.name} </h4>
          <h4>Username: {user.username}</h4>
        </div>
      ))}
    </div>
  );
}

export default Users;
