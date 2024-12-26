import { Canvas, Path, usePathValue } from '@shopify/react-native-skia';
import React from 'react';
import { Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

const RADIUS = 100;
const FULL_ROTATION = 2 * Math.PI;

export const BasicCircle = () => {
  const circlePath = usePathValue((newPath) => {
    'worklet';

    for (let i = 0; i < FULL_ROTATION; i += 0.1) {
      const x = RADIUS * Math.cos(i) + width / 2;
      const y = RADIUS * Math.sin(i) + height / 2;

      if (i === 0) {
        newPath.moveTo(x, y);
      } else {
        newPath.lineTo(x, y);
      }
    }

    newPath.close();
  });

  return (
    <View style={$background}>
      <Canvas style={$background}>
        <Path path={circlePath} color={$FIFTH_GREEN} style="stroke" strokeWidth={5} />
      </Canvas>
    </View>
  );
};

const $background = {
  flex: 1,
  backgroundColor: 'black',
};

const $FIFTH_GREEN = '#00cc00';
