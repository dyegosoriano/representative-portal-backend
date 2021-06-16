module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@repositories': './src/repositories',
          '@controllers': './src/controllers',
          '@middleware': './src/middleware',
          '@services': './src/services',
          '@config': './src/config',
          '@entity': './src/entity',
          '@errors': './src/errors',
          '@views': './src/views',
          '@util': './src/util',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
}
