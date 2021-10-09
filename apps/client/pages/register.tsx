import RegisterForm from '../components/registerForm/registerForm';
import { withNoAuthUrqlClient } from '../helpers/withAppUrqlClient';

export function Register() {
  return (
    <div>
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
}

// export default Login;
export default withNoAuthUrqlClient(Register);
