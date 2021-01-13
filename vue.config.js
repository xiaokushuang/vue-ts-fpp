module.exports = {
  //   baseUrl: "/datacenter/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/variables.scss";
        `
      }
    }
  },
  devServer: {
    // 开发环境下的配置
    host: "0.0.0.0",
    port: 7001,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_REQUEST,
        pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    },
    before: app => {}
  },
  lintOnSave: false
};
