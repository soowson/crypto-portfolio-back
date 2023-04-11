export interface RegistrationUserResponse {
  message: string;
}

export interface CheckUserResponse {
  authorized: boolean;
}

export interface RegistrationForm {
  email: string;
  pwd: string;
  pwdConfirm: string;
}

export interface LoginForm {
  email: string;
  pwd: string;
}
