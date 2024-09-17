import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import { View, TouchableOpacity, Text } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ flexDirection: 'row', height: 80, backgroundColor: colors.white }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                let iconName;
                if (route.name === 'Home') {
                    iconName = isFocused ? 'home' : 'home-outline';
                }
                else if (route.name === 'Cart') {
                    iconName = isFocused ? 'cart' : 'cart-outline';
                }
                else if (route.name === 'Profile') {
                    iconName = isFocused ? 'account' : 'account-outline';
                }

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testId={options.tabBarTestId}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                padding: 10,
                                backgroundColor: isFocused ? colors.cherry : 'transparent',
                                borderRadius: 20,
                                width: 90,
                                flexDirection: 'row'
                            }}>
                            <MaterialCommunityIcons name={iconName} size={24} color={isFocused ? colors.white : colors.gray} />
                            <Text style={{ color: isFocused ? colors.white : 'transparent', fontSize: 12, marginTop: 3, marginLeft: 5 }}>{label}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;