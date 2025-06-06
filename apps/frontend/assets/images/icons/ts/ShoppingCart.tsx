import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgShoppingCart = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 25 26"
    {...props}
  >
    <Path
      fill="#595959"
      d="M12.313 9.938v-3.75h-3.75V4.313h3.75V.563h1.874v3.75h3.75v1.875h-3.75v3.75zm-5.12 16.01a2.1 2.1 0 0 1-1.55-.64 2.1 2.1 0 0 1-.638-1.548q0-.912.638-1.55a2.1 2.1 0 0 1 1.55-.638 2.1 2.1 0 0 1 1.549.638q.638.638.638 1.55a2.1 2.1 0 0 1-.638 1.549 2.1 2.1 0 0 1-1.55.638m12.115 0a2.1 2.1 0 0 1-1.55-.64 2.1 2.1 0 0 1-.638-1.548q0-.912.638-1.55a2.1 2.1 0 0 1 1.55-.638 2.1 2.1 0 0 1 1.549.638q.638.638.638 1.55a2.1 2.1 0 0 1-.638 1.549 2.1 2.1 0 0 1-1.55.638M.125 3.687V1.812h3.577l5.216 11.01h8.522a.35.35 0 0 0 .192-.054.5.5 0 0 0 .145-.15l4.622-8.305h2.134l-5.115 9.24q-.307.54-.814.842a2.13 2.13 0 0 1-1.109.302h-9.12l-1.447 2.644q-.096.144-.006.313a.29.29 0 0 0 .27.168h14.303v1.875H7.192q-1.25 0-1.888-1.069t-.035-2.162l1.784-3.206-4.548-9.572z"
    />
  </Svg>
);
export default SvgShoppingCart;
