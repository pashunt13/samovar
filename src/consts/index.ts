export const MIN_ITEMS = 1;
export const MAX_ITEMS = 9;

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const SESSION_OPTIONS =   {
  cookieName: 'myapp_cookiename',
  password: 'complex_password_at_least_32_characters_long',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}