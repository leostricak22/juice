import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgAddPlus = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <Path
      fill="#1C1B1F"
      d="M10.063 21.478V11.79H.374V9.915h9.688V.228h1.874v9.687h9.688v1.875h-9.687v9.688z"
    />
  </Svg>
);
export default SvgAddPlus;
