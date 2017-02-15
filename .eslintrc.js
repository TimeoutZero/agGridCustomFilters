module.exports = {
  "env": {
    "browser"              : true,
    "commonjs"             : false,
    "es6"                  : true,
    "jasmine"              : true,
    "node"                 : false,
    "shared-node-browser"  : true,
    "mocha"                : false
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": false
    },
    "sourceType": "module"
  },
  "plugins": [
      "angular"
  ],
  "rules": {
    "no-console"     : 0,
    "linebreak-style": [
        "error",
        "unix"
    ],
    "semi": [
        "error",
        "always"
    ]
  },
  "globals" : {
    angular: true,
    module:  true,
    inject : true,
    require: true
  }
};