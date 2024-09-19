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

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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
            <View style={styles.checkout}>
                <Text style={styles.checkoutText}>Total Price: {totalPrice}$</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    checkout: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.white,
        width: '100%',
        height: 130,
        opacity: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 5,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.1,
        borderRightWidth: 0.1
    },
    checkoutText: {
        fontFamily: 'Poppins_500Medium',
        marginLeft: 15,
        marginTop: 25,
        fontSize: 16
    },
    button: {
        padding: 10,
        backgroundColor: colors.tealdark,
        width: 120,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: colors.white
    }
})

export default CartScreen;