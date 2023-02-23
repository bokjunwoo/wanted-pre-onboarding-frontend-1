export const emailRegex = (email: string) => {
  return !email.includes('@');
};

export const passwordRegex = (passoword: string) => {
  return passoword.length < 8;
};
