import * as React from 'react';
import Svg, {Rect, SvgProps} from 'react-native-svg';

function PauseSvg(props: SvgProps) {
  return (
    <Svg width={13} height={18} viewBox="0 0 13 18" fill="none" {...props}>
      <Rect
        rx={2}
        width={5}
        height={18}
        transform="translate(-.5)"
        fill="#FFF"
        fillOpacity={1}
      />
      <Rect
        rx={2}
        width={5}
        height={18}
        transform="translate(7.5)"
        fill="#FFF"
        fillOpacity={1}
      />
    </Svg>
  );
}

export default PauseSvg;
