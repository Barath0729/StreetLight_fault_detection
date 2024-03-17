/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../utils/common';
import axios from 'axios';

const Login = () => {
  const history = useNavigate();
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    history('/details');
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { 
      username: username.value, 
      password: password.value 
    })
    .then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      history('/details');
    })
    .catch(error => {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    });
  }

  return (
    <center>
      <div className="div1">
        Login<br /><br />
        <div>
          Username<br />
          <input type="text" {...username} autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
          Password<br />
          <input type="password" {...password} autoComplete="new-password" />
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      </div>
    </center>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;*/



// Login.js

/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'Barath' && password === '123456') {
      navigate('/details');
    } else {
      setError('Invalid username or password');
    }
  };
  

  return (
    <div className="div1" >
      <center>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={handleLogin}
        style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </center>
    </div>
  );
};

export default Login;*/
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null); 
    const { email, password } = formData;
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/logins', formData);
            console.log(res.data);
            navigate('/details');
        } catch (error) {
            console.error(error.response.data);
            setError("Invalid Password Or EmailId, Please check Them");
        }
    };

    return (
        <div className="div1">
            <center>
              <div className='logintext'>
                <h2>Login</h2>
                </div>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <br />
                <br />
                <button
                    onClick={handleLogin}
                    style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Login
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </center>
        </div>
    );
};

export default Login;