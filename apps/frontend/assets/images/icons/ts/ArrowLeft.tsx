import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgArrowLeft = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 15 25"
    {...props}
  >
    <Path
      fill="#000"
      d="M12.567 24.42.5 12.353 12.567.286l1.774 1.774L4.048 12.353 14.34 22.646z"
    />
  </Svg>
);
export default SvgArrowLeft;
