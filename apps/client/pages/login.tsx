import LoginForm from '../components/loginForm/loginForm';
import { withAppUrqlClient } from '../helpers/withAppUrqlClient';

export function Login() {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}

export default withAppUrqlClient(Login);
