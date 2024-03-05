module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': 0,
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        'keyword-spacing': 'error',
        'no-trailing-spaces': 'error',
        'space-before-blocks': 'error',
        'arrow-body-style': 'error',
        'no-multi-spaces': 'error',
        'eol-last': 'error',
        'no-use-before-define': 'error',
        'no-tabs': 'error',
        'key-spacing': 'error',
        eqeqeq: 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'spaced-comment': [
            'error',
            'always',
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'quote-props': [
            'error',
            'as-needed',
        ],
        'comma-spacing': [
            'error',
            { after: true },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                maxBOF: 0,
                max: 1,
                maxEOF: 0,
            },
        ],
        'space-infix-ops': [
            'error',
            { int32Hint: true },
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
    },
};
