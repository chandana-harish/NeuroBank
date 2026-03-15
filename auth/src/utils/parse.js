export const parseExpToSec = (exp) => {
  const match = String(exp).match(/^(\d+)([dhms]?)$/);
  if (!match) return 3600; // default 1 hour
  const val = parseInt(match[1]);
  switch (match[2]) {
    case "d":
      return val * 24 * 60 * 60;
    case "h":
      return val * 60 * 60;
    case "m":
      return val * 60;
    case "s":
      return val;
    default:
      return val;
  }
};

export const parseExpToMs = (exp) => {
  const match = String(exp).match(/^(\d+)([dhms]?)$/);
  if (!match) return 3600 * 1000; // default 1 hour
  const val = parseInt(match[1]);
  switch (match[2]) {
    case "d":
      return val * 24 * 60 * 60 * 1000;
    case "h":
      return val * 60 * 60 * 1000;
    case "m":
      return val * 60 * 1000;
    case "s":
      return val * 1000;
    default:
      return val * 1000;
  }
};
