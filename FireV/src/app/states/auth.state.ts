import { User } from "../models/user.model";

export interface AuthState{
  isAuthenticated: boolean;
  idToken: string;
  error: string;
  _id: string;
  user: User;
}
