import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default {
    input: "src/lib/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
        },
        {
            file: pkg.module,
            format: "es",
        },
    ],
    external: [
        "react",
        "moment",
        "moment-timezone",
        "antd"
    ],
    plugins: [
        resolve(),
        json(),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                'node_modules/react-dom/index.js': ['render', 'findDOMNode', 'unmountComponentAtNode'],
                'node_modules/react-is/index.js': ['isFragment', 'ForwardRef'],
            }
        }),
        scss(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
};
