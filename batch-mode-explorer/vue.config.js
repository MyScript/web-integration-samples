module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',

  pwa: {
    themeColor: '#1A9FFF',
    name: 'Interactive Ink SDK - draft mode explorer',
    msTileColor: '#1A9FFF'
  }
}