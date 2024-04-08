import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function ContinueSvg(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Path d="M10 20A10 10 0 100 10a10 10 0 0010 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347z" />
    </Svg>
  );
}

export default ContinueSvg;
