import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoritesContext from "../assets/context/FavoritesContext";
import CartContext from "../assets/context/CartContext";

const height = Dimensions.get("window").height;

const PostDetails = ({ route, navigation }) => {
    const [heart, setHeart] = useState("heart-outlined");
    const { item } = route.params;

    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    const isAddedToCart = cart.some(cartItem => cartItem.id === item.id);
    const isFavorite = favorites.some(favItem => favItem.id === item.id);

    const toggleCart = () => {
        if (isAddedToCart) {
            removeFromCart(item.id);
        }
        else {
            addToCart(item);
        }
    };

    const toggleLike = () => {
        if (isFavorite) {
            removeFavorite(item.id);
        }
        else {
            addFavorite(item);
        }
    };

    const addCart = isAddedToCart ? <Text>Remove from cart</Text> : <Text>Add to cart</Text>;
    const addLike = isFavorite ? <Text>Unlike the Product</Text> : <Text>Like the product</Text>;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageBackground src={item.image} style={styles.backgroundImage}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Entypo name="chevron-left" size={32} color={colors.white} style={styles.backButton} />
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.informationWrapper}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.priceText}>{item.price}$</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionWrapper}>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                </View>

                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity style={styles.buttons} onPress={toggleCart}>
                        <Text style={styles.cartText}>{addCart}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={toggleLike}>
                        <Text style={styles.favoriteText}>{addLike}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        marginBottom: 10
    },
    backIcon: {
        marginTop: 15,
        marginLeft: 15
    },
    backgroundImage: {
        height: height * 0.499,
        justifyContent: 'space-between',
        marginTop: 10
    },
    informationWrapper: {
        height: 270,
        margin: 10,
    },
    titleWrapper: {

    },
    itemTitle: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: '700',
        fontSize: 16
    },
    priceWrapper: {
        marginBottom: 10
    },
    priceText: {
        color: colors.gray,
        fontSize: 15
    },
    descriptionWrapper: {
        marginHorizontal: 10,
    },
    descriptionText: {
        fontSize: 15,
        fontFamily: 'Poppins_500Medium'
    },
    buttonsWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    buttons: {
        padding: 10,
        backgroundColor: colors.teallight,
        width: 170,
        height: 50,
        borderRadius: 10
    },
    cartText: {
        textAlign: 'center',
        color: colors.white
    },
    favoriteText: {
        textAlign: 'center',
        color: colors.white
    }
});

export default PostDetails;