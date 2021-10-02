module.exports = ({ env }) => ({
  port: env.int('PORT', 1338),
});
