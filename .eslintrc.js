module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "jQuery": true,
        "es6": true,
        "node": true
    },
    // "extends": "eslint:recommended",
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-var": 0,
        comma-dangle: ["error", "never"]
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};