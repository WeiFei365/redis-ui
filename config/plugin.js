'use strict';

// had enabled by egg
// exports.static = true;

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};
