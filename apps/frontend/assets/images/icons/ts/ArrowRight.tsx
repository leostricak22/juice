import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgArrowRight = (props) => (
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
      d="M2.433.286 14.5 12.353 2.433 24.42.659 22.646l10.293-10.293L.66 2.06z"
    />
  </Svg>
);
export default SvgArrowRight;
