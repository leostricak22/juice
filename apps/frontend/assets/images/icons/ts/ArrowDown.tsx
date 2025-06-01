import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgArrowDown = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 21 12"
    {...props}
  >
    <Path
      fill="#000"
      d="M20.154 1.699 10.5 11.353.846 1.699l1.42-1.42L10.5 8.516 18.735.28z"
    />
  </Svg>
);
export default SvgArrowDown;
