import path from "path";
import HTMLWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import webpack from "webpack";
import "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = "development" | "production";

interface EnvVariables {
  mode: Mode;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      publicPath: "/",
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
    devtool: "eval-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.module\.s[ac]ss$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                esModule: true,
                modules: {
                  localIdentName: "[local]__[hash:base64:8]",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /\.module\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: "convertColors",
                      params: {
                        currentColor: true,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
      modules: ["src", "node_modules"],
      alias: {
        "@/assets": path.resolve(__dirname, "src", "assets"),
        "@/pages": path.resolve(__dirname, "src", "pages"),
        "@/components": path.resolve(__dirname, "src", "components"),
        "@/types": path.resolve(__dirname, "src", "types"),
        "@/services": path.resolve(__dirname, "src", "services"),
        "@/styles": path.resolve(__dirname, "src", "styles"),
        "@/context": path.resolve(__dirname, "src", "context"),
        "@/hooks": path.resolve(__dirname, "src", "hooks"),
      },
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
      open: true,
      proxy: [
        {
          context: ["/api"],
          target: "https://codelang.vercel.app",
          changeOrigin: true,
          secure: true,
        },
        {
          context: ["/socket.io"],
          target: "https://codelang.vercel.app",
          changeOrigin: true,
          secure: true,
          ws: true, // ВАЖНО: проксировать WebSocket upgrade
        },
      ],
    },
  };

  return config;
};
