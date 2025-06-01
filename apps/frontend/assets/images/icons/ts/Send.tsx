import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgSend = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 16"
    {...props}
  >
    <Path
      fill="#fff"
      d="M.5 15.25V.75L17.712 8zM2 13l11.85-5L2 3v3.692L7.423 8 2 9.308z"
    />
  </Svg>
);
export default SvgSend;
