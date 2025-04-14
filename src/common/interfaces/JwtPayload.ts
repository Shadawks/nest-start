export default interface JwtPayload {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}
