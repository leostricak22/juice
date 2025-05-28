import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgHome = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 22"
    {...props}
  >
    <Path
      fill="#595959"
      d="M2.5 19.75h4.183v-7.428h6.634v7.428H17.5V8.5L10 2.85 2.5 8.5zM.625 21.625V7.562L10 .507l9.375 7.055v14.063h-7.933v-7.428H8.558v7.428z"
    />
  </Svg>
);
export default SvgHome;
