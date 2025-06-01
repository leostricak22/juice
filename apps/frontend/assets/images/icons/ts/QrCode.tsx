import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgQrCode = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <Path
      fill="#F57E20"
      d="M12.25 21.649v-2.38h2.38v2.38zm-2.38-2.38v-5.89h2.38v5.89zm9.4-3.99v-4.28h2.38v4.28zm-2.38-4.28V8.62h2.38V11zM2.73 13.38V11h2.38v2.38zM.351 11V8.62h2.38V11zm10.65-8.268V.35h2.379v2.38zM1.84 6h4.16V1.84H1.84zM.351 7.49V.35h7.14v7.14zm1.49 12.669h4.255v-4.16H1.841zm-1.49 1.49v-7.14h7.236v7.14zm15.65-15.65h4.158V1.842H16zM14.51 7.49V.35h7.14v7.14zm2.38 14.159v-3.99h-2.38v-2.38h4.76v3.99h2.38v2.38zm-4.64-8.27V11h4.64v2.38zm-4.76 0V11H5.11V8.62h7.14V11H9.87v2.38zM8.62 7.49V2.73H11v2.38h2.38v2.38zM3.055 4.786v-1.73h1.731v1.73zM3.14 18.86v-1.73h1.73v1.73zM17.214 4.786v-1.73h1.73v1.73z"
    />
  </Svg>
);
export default SvgQrCode;
