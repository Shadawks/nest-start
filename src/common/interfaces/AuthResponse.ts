import { User } from '../../api/users/user.entity';

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export default AuthResponse;