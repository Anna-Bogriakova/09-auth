export type RegisterRequest = {
  email: string;
  password: string;
};

export interface User {
  email: string;
  username: string;
  avatar: string;
}
