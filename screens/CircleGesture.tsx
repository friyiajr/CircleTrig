import { Canvas, Circle, Text, matchFont } from '@shopify/react-native-skia';
import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
const fontStyle = {
  fontFamily,
  fontSize: 40,
  fontWeight: 'bold',
};

// @ts-ignore
const font = matchFont(fontStyle);

const { width, height } = Dimensions.get('screen');

const RADIUS = 100;
const FULL_ROTATION = 2 * Math.PI;

export const CircleGesture = () => {
  const crankX = useSharedValue(width / 2 + 100);
  const crankY = useSharedValue(height / 2);
  const radians = useSharedValue(0);

  const textVal = useDerivedValue(() => {
    return radians.value.toFixed(2);
  }, [crankX, crankY]);

  const textPosition = useDerivedValue(() => {
    return width / 2 - font.measureText(textVal.value).width / 2;
  }, [textVal]);

  const gesture = Gesture.Pan().onChange(({ x, y }) => {
    const opposite = y - height / 2;
    const adjacent = x - width / 2;
    const radius = 100;

    const theta = Math.atan2(opposite, adjacent);
    crankX.value = radius * Math.cos(theta) + width / 2;
    crankY.value = radius * Math.sin(theta) + height / 2;

    // atan2 always gives us values in the range (+ / -) [0, Math.PI]
    // we need to convert this to a full rotation 2 * Math.PI * Radius
    let dist = -theta;
    if (dist < 0) {
      dist = FULL_ROTATION - theta;
    }

    radians.value = dist;
  });

  return (
    <View style={$background}>
      <GestureDetector gesture={gesture}>
        <Canvas style={$background}>
          <Circle
            cx={width / 2}
            cy={height / 2}
            color="grey"
            r={RADIUS}
            style="stroke"
            strokeWidth={10}
          />
          <Circle cx={crankX} cy={crankY} color={$TERMINAL_GREEN} r={20} />
          <Text
            x={textPosition}
            y={height / 2 - 200}
            color={$TERMINAL_GREEN}
            font={font}
            text={textVal}
          />
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const $background = {
  flex: 1,
  backgroundColor: 'black',
};

const $TERMINAL_GREEN = '#66FF07';
