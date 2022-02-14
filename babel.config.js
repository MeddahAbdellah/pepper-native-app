/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable space-before-function-paren */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
