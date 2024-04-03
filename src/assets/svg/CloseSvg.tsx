import * as React from 'react';
import Svg, {
  Path,
  Rect,
  Circle,
  Defs,
  ClipPath,
  SvgProps,
} from 'react-native-svg';

function CloseSvg(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path strokeOpacity={0.24} strokeWidth={2} d="M1 1H23V23H1z" />
      <Rect
        x={3.025}
        y={2.025}
        width={17.95}
        height={19.95}
        rx={0.975}
        strokeOpacity={0.48}
        strokeWidth={0.05}
      />
      <Rect
        x={2.025}
        y={3.025}
        width={19.95}
        height={17.95}
        rx={0.975}
        strokeOpacity={0.48}
        strokeWidth={0.05}
      />
      <Rect
        opacity={0.2}
        x={2.025}
        y={1.525}
        width={19.95}
        height={20.95}
        rx={0.975}
        strokeOpacity={0.48}
        strokeWidth={0.05}
      />
      <Rect
        opacity={0.2}
        x={1.525}
        y={3.025}
        width={20.95}
        height={17.95}
        rx={0.975}
        strokeOpacity={0.48}
        strokeWidth={0.05}
      />
      <Rect
        x={2.525}
        y={2.525}
        width={18.95}
        height={18.95}
        rx={0.975}
        strokeOpacity={0.48}
        strokeWidth={0.05}
      />
      <Rect
        opacity={0.6}
        x={3.525}
        y={3.525}
        width={16.95}
        height={16.95}
        rx={0.975}
        strokeOpacity={0.48}
        strokeWidth={0.05}
      />
      <Circle
        cx={12}
        cy={12}
        r={9.975}
        strokeOpacity={0.48}
        strokeWidth={0.05}
      />
      <Path
        d="M3.75 3.75l8 8m8 8l-8-8m0 0l-8 8 16-16"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <ClipPath id="clip0_218_867">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CloseSvg;
