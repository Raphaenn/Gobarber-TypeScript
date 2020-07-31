modules.exports = {
    presets: [
        ['@babel/preset-env', { target: { node: 'current' } }],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolve', {
            alias: {
                "@modules": "./src/modules",
                "@config": "./src/config",
                "@shared": "./src/shared"
            }
        }],
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ]
}