import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { addIconActive, addIconInActive, darkGrey, homeIconActive, homeIconInActive, primaryColor, statsIconActive, statsIconInActive } from '../../Constants/constants';

export const BottomNavBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.cont}>
      {state.routes.map((route: { key: string | number; name: any; params: any; }, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        var activeIcon = homeIconActive;
        var inactiveIcon = homeIconInActive;

        switch (route.name) {
          case "Home":
            activeIcon = homeIconActive;
            inactiveIcon = homeIconInActive;
            break;
          case "Add":
            activeIcon = addIconActive;
            inactiveIcon = addIconInActive;
            break;
          case "Stats":
            activeIcon = statsIconActive;
            inactiveIcon = statsIconInActive;
            break;
          default:
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
          key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.btnCont}
          >
            <Image source={isFocused ? activeIcon : inactiveIcon} />
            <Text style={[{ color: isFocused ? primaryColor : darkGrey }, styles.btnText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    // height:84,
    elevation: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 8
  },
  btnCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18
  },
  btnText: {
    margin: 6,
  }
})