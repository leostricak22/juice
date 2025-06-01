import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgChat = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#F57E20"
      d="M4.813 14.188h9.375v-1.876H4.813zm0-3.75h14.375V8.562H4.813zm0-3.75h14.375V4.813H4.813zM.125 23.298V2.385q0-.948.656-1.604A2.18 2.18 0 0 1 2.385.125h19.23q.948 0 1.604.656.656.657.656 1.604v14.23q0 .948-.656 1.604a2.18 2.18 0 0 1-1.604.656H4.548zM3.75 17h17.865q.145 0 .265-.12t.12-.265V2.385a.37.37 0 0 0-.12-.265.37.37 0 0 0-.265-.12H2.385a.37.37 0 0 0-.265.12.37.37 0 0 0-.12.265V18.73z"
    />
  </Svg>
);
export default SvgChat;
