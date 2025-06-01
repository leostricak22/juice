import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgSearch = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <Path
      fill="#1C1B1F"
      d="m16.542 17.93-6.28-6.281q-.75.62-1.725.97t-2.018.35q-2.563 0-4.34-1.776Q.405 9.417.405 6.854q0-2.562 1.775-4.34Q3.955.738 6.518.738q2.562 0 4.34 1.775 1.777 1.776 1.777 4.34 0 1.071-.36 2.046t-.96 1.696l6.281 6.281zM6.52 11.468q1.933 0 3.274-1.341 1.342-1.341 1.342-3.274T9.793 3.579Q8.453 2.237 6.52 2.237q-1.932 0-3.274 1.342-1.341 1.34-1.341 3.274t1.341 3.274 3.274 1.341"
    />
  </Svg>
);
export default SvgSearch;
