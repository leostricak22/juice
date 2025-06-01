import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgClose = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 23"
    {...props}
  >
    <Path
      fill="#000"
      d="M2.666 22.442.91 20.686l9.333-9.333L.91 2.019 2.666.263 12 9.597 21.333.263 23.09 2.02l-9.333 9.334 9.333 9.333-1.756 1.756L12 13.11z"
    />
  </Svg>
);
export default SvgClose;
