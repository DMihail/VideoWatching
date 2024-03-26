import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function RightArrowSvg(props: SvgProps) {
  return (
    <Svg width={10} height={18} viewBox="0 0 10 18" fill="none" {...props}>
      <Path
        d="M1 1l8 8-8 8"
        stroke="#F5F5F5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default RightArrowSvg;
