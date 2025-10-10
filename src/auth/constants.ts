const secret = process.env.JWT_CONSTANTS;
if (!secret) {
  throw new Error('JWT_CONSTANTS environment variable is not set!');
}

export const jwtConstants = { secret };
