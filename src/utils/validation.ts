import type { Profile } from '../types';

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function validateCurrency(currency: string): boolean {
  const validCurrencies = ['USD', 'EUR', 'GBP'];
  return validCurrencies.includes(currency);
}

export function validateTimezone(timezone: string): boolean {
  // Implement timezone validation logic
  return true;
}

export function validateStep1(profile: Profile): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!validateEmail(profile.email)) errors.email = 'Invalid email address';
  if (!validatePassword(profile.password)) errors.password = 'Password must be at least 8 characters long';
  if (!validateCurrency(profile.currency)) errors.currency = 'Invalid currency selected';
  if (!validateTimezone(profile.timezone)) errors.timezone = 'Invalid timezone selected';

  return errors;
}