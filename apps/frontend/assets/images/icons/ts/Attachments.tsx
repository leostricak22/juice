import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgAttachments = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 16"
    {...props}
  >
    <Path
      fill="#1C1B1F"
      d="M2.548 15.5q-.757 0-1.282-.525a1.74 1.74 0 0 1-.525-1.281V8.192h1.5v5.5a.3.3 0 0 0 .086.222.3.3 0 0 0 .221.086h11.385a.3.3 0 0 0 .221-.086.3.3 0 0 0 .087-.222V2.308a.3.3 0 0 0-.087-.221.3.3 0 0 0-.221-.087h-5.5V.5h5.501q.756 0 1.282.525.525.525.525 1.283v4.577l3.519-3.52v9.27l-3.52-3.52v4.577q0 .758-.524 1.283-.525.525-1.283.525zm1.02-3.635h9.346L9.856 7.788l-2.577 3.347-1.615-2.05zM2.74 6V4h-2V2.5h2v-2h1.5v2h2V4h-2v2z"
    />
  </Svg>
);
export default SvgAttachments;
