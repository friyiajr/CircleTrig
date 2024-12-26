import {
  Canvas,
  Circle,
  DashPathEffect,
  Group,
  Line,
  Path,
  Shadow,
  usePathValue,
  vec,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { Easing, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

interface Point {
  x: number;
  y: number;
}

const ROSE_FULL_ROTATION = 2 * Math.PI * 10;
const FULL_ROTATION = 2 * Math.PI;
const RADIUS = 100;

const getCrankPoint = (theta: number): Point => {
  'worklet';
  // Offsets used to center the circle
  const offsetX = width / 2;
  const offsetY = height / 2 + 200;

  const r = 100;

  // Translated to Cartesian Coordinates
  const xPos = r * Math.cos(theta) + offsetX;
  const yPos = r * Math.sin(theta) + offsetY;

  return {
    x: xPos,
    y: yPos,
  };
};

const getRosePoint = (theta: number): Point => {
  'worklet';
  const offsetX = width / 2;
  const offsetY = height / 2 - 150;

  const k = 4 / 5;

  const r = RADIUS * Math.cos(k * theta);

  const xPos = r * Math.cos(theta) + offsetX;
  const yPos = r * Math.sin(theta) + offsetY;

  return {
    x: xPos,
    y: yPos,
  };
};

export const PolarCurveRose = () => {
  const totalRotations = useSharedValue(0);

  const origin = vec(width / 2, height / 2 - 150);

  useEffect(() => {
    totalRotations.value = withTiming(4 * 2 * Math.PI, {
      easing: Easing.linear,
      duration: 10000,
    });
  }, []);

  const emptyPath = usePathValue((newPath) => {
    'worklet';

    for (let i = 0; i < ROSE_FULL_ROTATION; i += 0.1) {
      const point = getRosePoint(i);
      if (i === 0) {
        newPath.moveTo(point.x, point.y);
        continue;
      } else {
        newPath.lineTo(point.x, point.y);
      }
    }
  });

  const filledPath = usePathValue((newPath) => {
    'worklet';

    for (let i = 0; i < totalRotations.value * (5 / 4); i += 0.1) {
      const point = getRosePoint(i);
      if (i === 0) {
        newPath.moveTo(point.x, point.y);
        continue;
      } else {
        newPath.lineTo(point.x, point.y);
      }
    }
  });

  const crankPath = usePathValue((newPath) => {
    'worklet';
    for (let i = 0; i < FULL_ROTATION; i += 0.1) {
      const point = getCrankPoint(i);
      if (i === 0) {
        newPath.moveTo(point.x, point.y);
        continue;
      }
      newPath.lineTo(point.x, point.y);
    }
    newPath.close();
  });

  const crankX = useDerivedValue(() => {
    return RADIUS * Math.cos(totalRotations.value) + width / 2;
  }, [totalRotations]);

  const crankY = useDerivedValue(() => {
    return RADIUS * Math.sin(totalRotations.value) + (height / 2 + 200);
  }, [totalRotations]);

  const lineStart = useDerivedValue(() => {
    return vec(crankX.value, height / 2 - 150);
  }, [crankX]);

  const lineFinish = useDerivedValue(() => {
    return vec(crankX.value, crankY.value);
  }, [crankX]);

  const transform = useDerivedValue(() => {
    return [{ rotateZ: -totalRotations.value * (5 / 4) }];
  }, [totalRotations]);

  return (
    <View style={$background}>
      <Canvas style={$background}>
        <Group origin={origin} transform={transform}>
          <Path
            path={emptyPath}
            color={$FIFTH_GREEN}
            style="stroke"
            strokeWidth={3}
            opacity={0.2}
          />
          <Path path={filledPath} color={$FIFTH_GREEN} style="stroke" strokeWidth={3} opacity={1} />
        </Group>
        <Line
          p1={vec(width / 2 - 125, height / 2 - 150)}
          p2={vec(width / 2 + 125, height / 2 - 150)}
          color="lightgrey"
          strokeWidth={2}
        />
        <Line p1={lineStart} p2={lineFinish} color="grey" strokeWidth={3}>
          <DashPathEffect intervals={[4, 4]} />
          <Shadow dx={0} dy={0} blur={5} color={$FIFTH_GREEN} />
        </Line>
        <Path path={crankPath} color={$FOURTH_GREEN} style="stroke" strokeWidth={2}>
          <DashPathEffect intervals={[4, 4]} />
        </Path>

        <Circle cx={crankX} cy={height / 2 - 150} r={12} color={$SIXTH_GREEN}>
          <Shadow dx={0} dy={0} blur={10} color={$FIFTH_GREEN} />
        </Circle>

        <Circle cx={crankX} cy={crankY} r={20} color={$FOURTH_GREEN}>
          <Shadow dx={0} dy={0} blur={20} color={$FIFTH_GREEN} />
        </Circle>
      </Canvas>
    </View>
  );
};

const $background = {
  flex: 1,
  backgroundColor: 'black',
};

const $FOURTH_GREEN = '#199515';
const $FIFTH_GREEN = '#00cc00';
const $SIXTH_GREEN = '#4ee44e';
