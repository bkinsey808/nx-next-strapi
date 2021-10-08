import LoginForm from '../components/loginForm/loginForm';
import { withAppUrqlClient } from '../helpers/withAppUrqlClient';


export function Login() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}

export default withAppUrqlClient(Login);
