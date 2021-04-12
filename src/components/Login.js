import { login } from "../services/login";

export const Login = ({
  username,
  password,
  setUser,
  setUsername,
  setPassword,
}) => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login({ username, password });
    console.log(user);
    setUser(user);
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        name="Username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        name="current-password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};
