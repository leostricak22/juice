import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgAdd = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 30 31"
    {...props}
  >
    <Path
      fill="#F57E20"
      d="M29.744 12.48v5.005H.476V12.48zM17.837.256v30.488h-5.425V.256z"
    />
  </Svg>
);
export default SvgAdd;
