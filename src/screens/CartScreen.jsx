import { useContext } from "react";
import { View, Text, StyleSheet, FlatList, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from '../assets/context/CartContext';
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

const CartScreen = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    if (!cart || cart.length === 0) {
        return (
            <SafeAreaView>
                <Text style={styles.emptyText}>Cart is empty right now!</Text>
            </SafeAreaView>
        );
    };

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Items on cart</Text>
            </View>
            <FlatList
                alwaysBounceVertical
                showsVerticalScrollIndicator={false}
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.cartWrapper}>
                        <ImageBackground src={item.image} style={styles.productImage}>
                            <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.removeButton}>
                                <Entypo
                                    name='cross'
                                    size={28}
                                    color={colors.orange}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                        <Card.Content style={styles.productText}>
                            <Text style={styles.productItemTitle}>{item.title}</Text>
                            <Text style={styles.productPrice}>{item.price}$</Text>
                        </Card.Content>
                    </Card>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20
    },
    titleWrapper: {
        margin: 8
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        fontWeight: '700',
        fontSize: 18
    },
    cartWrapper: {
        marginHorizontal: 12,
        marginVertical: 5
    },
    productImage: {
        height: 200,
        overflow: 'hidden',
        borderRadius: 10
    },
    productText: {
        fontSize: 16,
        color: colors.white,
        marginTop: 10,
        paddingBottom: 10,
        fontFamily: 'Poppins_400Regular'
    },
    productItemTitle: {
        fontSize: 16,
        color: colors.black
    },
    productPrice: {
        marginVertical: 5,
        color: colors.black,
        fontFamily: 'Poppins_400Regular'
    },
    removeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
        width: 44,
        height: 44,
        backgroundColor: colors.white,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default CartScreen;