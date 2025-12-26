import type { CartItem } from "./product";

export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  fullname: string;
  avatar?: string;
  banner?: string;
  address?: Address;
  mobile?: PhoneNumber;
  role: UserRole;
  dateJoined: number;
  basket?: CartItem[];
}

export interface Address {
  address: string;
  isInternational: boolean;
}

export interface PhoneNumber {
  value: string;
  dialCode: string;
  countryCode: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authError: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends SignInCredentials {
  fullname: string;
}
