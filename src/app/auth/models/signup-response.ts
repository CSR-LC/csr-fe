export type SignupResponse = {
  data: SuccessSignup | ErrorSignup;
};

export type SuccessSignup = {
  id: number;
  login: string;
};

type ErrorSignup = {
  correlationId: string;
  message: string;
};
