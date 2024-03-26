import * as React from 'react';
import Svg, {
  G,
  Path,
  Rect,
  Circle,
  Defs,
  ClipPath,
  SvgProps,
} from 'react-native-svg';

function SearchSvg(props: SvgProps) {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
      <G clipPath="url(#clip0_218_1012)" stroke="#56ACDC">
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
      </G>
      <Circle
        cx={10.9853}
        cy={10.9873}
        r={7}
        transform="rotate(-45 10.985 10.987)"
        stroke="#F5F5F5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.14 16.722a1.125 1.125 0 011.58-1.58l4.363 3.445a1.778 1.778 0 11-2.498 2.498l-3.445-4.363z"
        fill="#F5F5F5"
      />
      <Defs>
        <ClipPath id="clip0_218_1012">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SearchSvg;
