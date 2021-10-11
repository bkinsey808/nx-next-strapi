import LoginForm from '../components/loginForm/loginForm';
import { withNoAuthUrqlClient } from '../helpers/withAppUrqlClient';

export function Login() {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}

export default withNoAuthUrqlClient(Login);
