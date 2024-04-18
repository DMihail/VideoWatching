import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function ContinueSvg(props: SvgProps) {
  return (
    <Svg width={10} height={12} viewBox="0 0 10 12" fill="none" {...props}>
      <Path
        d="M9.63 7.13c-.06.05-.27.3-.47.51-1.17 1.28-4.21 3.38-5.8 4.02-.24.1-.85.32-1.18.34-.31 0-.61-.08-.89-.22-.36-.21-.64-.53-.8-.91-.1-.26-.25-1.05-.25-1.06C.08 8.95 0 7.55 0 6c0-1.47.08-2.81.21-3.69.01-.01.17-.99.34-1.32C.86.38 1.47 0 2.13 0h.05C2.61.01 3.5.39 3.5.4c1.51.65 4.48 2.64 5.67 3.97 0 0 .34.34.48.55.23.31.35.69.35 1.07 0 .42-.13.82-.37 1.14z"
        fill="#FFFFFF"
        fillOpacity={1}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default ContinueSvg;
