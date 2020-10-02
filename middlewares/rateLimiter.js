const rateLimit = require("express-rate-limit");
const limit = process.env.RATELIMIT || 10;
const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 10 * 1000, // 10 seconds in milliseconds
  max: limit,
  message: "You have exceeded the " + limit + " requests in 10 seconds limit!",
  headers: true,
});

module.exports = rateLimiterUsingThirdParty;
