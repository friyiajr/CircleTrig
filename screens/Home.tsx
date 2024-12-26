import { useNavigation } from '@react-navigation/native';
import { SCREENS } from 'navigation';
import React from 'react';
import { ViewStyle, FlatList, Text, SafeAreaView, Pressable, Platform } from 'react-native';

export const Home = () => {
  const nav = useNavigation<any>();
  const screens = SCREENS.filter((item) => item !== 'Home');
  return (
    <SafeAreaView style={$container}>
      <FlatList
        data={screens}
        renderItem={({ item }) => {
          const onPress = () => {
            nav.push(item);
          };
          return (
            <Pressable style={$listItem} onPress={onPress}>
              <Text style={{ color: 'white' }}>{item}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: 'black',
  paddingHorizontal: 24,
  paddingTop: Platform.OS === 'android' ? 52 : 0,
};

const $listItem: ViewStyle = {
  paddingVertical: 24,
  marginHorizontal: 16,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#222222',
  marginVertical: 8,
};
