import { User } from '../../api/users/user.entity';

export default interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
