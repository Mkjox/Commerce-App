import { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.menu}>
                <Ionicons name='reorder-three-outline' size={40} style={styles.menuIcon} />
                <View style={styles.menuRight}>
                    <FontAwesome name='shopping-bag' size={32} style={styles.bagIcon} />
                    <Text style={styles.cartCount}>0 {/* Dynamic cart number goes here */}</Text>
                </View>
            </View>

            <View>
                <FlatList horizontal={false}>

                </FlatList>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    menuIcon: {
        marginLeft: 10
    },
    menuRight: {
        marginRight: 15,
        flexDirection: 'row'
    },
    bagIcon: {
        marginRight: 10
    },
    cartCount: {
        fontSize: 20,
        marginTop: 5
    }
});

export default HomeScreen;