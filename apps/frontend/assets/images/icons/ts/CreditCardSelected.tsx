import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgCreditCard = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 64 51"
    {...props}
  >
    <Path
        fill={props.color ?? "#F57E20"}
        d="M63.667 6.379v37.948q0 2.526-1.75 4.276t-4.276 1.75H6.359q-2.526 0-4.276-1.75t-1.75-4.276V6.379q0-2.526 1.75-4.276T6.36.353h51.282q2.526 0 4.276 1.75t1.75 4.276M5.333 13.366h53.334V6.38q0-.386-.321-.705-.321-.321-.705-.321H6.359q-.386 0-.705.32-.32.32-.32.706zm0 10.64v20.321q0 .385.321.705.32.32.705.32h51.282q.384 0 .705-.32t.32-.705v-20.32z"
    />
  </Svg>
);
export default SvgCreditCard;
