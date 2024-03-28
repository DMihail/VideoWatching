import React, {FC, forwardRef, LegacyRef} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../rules/COLORS.ts';

type StyledTextProps = TextProps & {
  fontWeight?: 'regular' | 'bold' | 'semi-bold' | 'extra' | 'boldest';
};

const FontsWeight = {
  regular: 'NunitoSans-Regular',
  bold: 'NunitoSans-Bold',
  'semi-bold': 'NunitoSans-SemiBold',
  extra: 'NunitoSans-ExtraBold',
  boldest: 'NunitoSans-Black',
};

const StyledText: FC<StyledTextProps> = forwardRef(
  (props: StyledTextProps, ref: LegacyRef<Text>) => {
    const currentFontWeight = props.fontWeight
      ? FontsWeight[props.fontWeight]
      : FontsWeight.regular;

    return (
      <Text
        ref={ref}
        {...props}
        style={[styles.text, {fontFamily: currentFontWeight}, props.style]}
      />
    );
  },
);

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
  },
});

StyledText.displayName = 'StyledText';

export default StyledText;
