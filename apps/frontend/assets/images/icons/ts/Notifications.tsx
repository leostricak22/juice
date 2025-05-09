import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgNotifications = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 1024 1024"
    {...props}
  >
    <Path d="M439.9 716.8h144.2C573.5 746.6 545.4 768 512 768s-61.5-21.4-72.1-51.2m302.5-102.4C706.5 585.1 640 531.2 640 409.6v-29.3c0-42-23-63-77.1-70.1.1-1 .3-2 .3-3.1 0-28.3-22.9-51.2-51.2-51.2s-51.2 22.9-51.2 51.2c0 1 .2 2 .3 3.1-54.1 7.1-77.1 28.1-77.1 70.1v29.3c0 121.6-66.5 175.5-102.4 204.8.4.4 0 51.2 0 51.2h460.8s-.4-50.8 0-51.2" />
  </Svg>
);
export default SvgNotifications;
