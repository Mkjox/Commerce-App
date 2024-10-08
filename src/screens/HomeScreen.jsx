import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import colors from '../assets/colors/colors';
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getRequest } from '../assets/services/httpService';
import { BASE_URL, PRODUCTS_URL } from "../assets/services/url";
import FavoritesContext from "../assets/context/FavoritesContext";
import CartContext from "../assets/context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    async function getPosts() {
        getRequest(`${BASE_URL}${PRODUCTS_URL}`)
            .then((response) => setData(response?.data))
            .catch((error) => console.log(error));
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, []);

    const cartCount = cart.length;

    if (loading) {
        return <ActivityIndicator size="large" color={colors.orange} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.menu}>
                <Ionicons name='reorder-three-outline' size={40} style={styles.menuIcon} />
                <TouchableOpacity style={styles.menuRight} onPress={() => navigation.navigate('Cart')}>
                    <FontAwesome name='shopping-bag' size={32} style={styles.bagIcon} />
                    <Text style={styles.cartCount}>{cartCount}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.productWrapper}>
                <View style={styles.productItemsWrapper}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {

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

                            const toggleHeart = () => {
                                if (isFavorite) {
                                    removeFavorite(item.id);
                                }
                                else {
                                    addFavorite(item);
                                }
                            };

                            const cartIcon = isAddedToCart ? 'cart-arrow-down' : 'cart-plus';
                            const heartIcon = isFavorite ? 'heart' : 'heart-outlined';

                            return (
                                <TouchableOpacity>
                                    <Card
                                        style={styles.productInnerWrapper}
                                        onPress={() => navigation.navigate("Details", { item: item })}>
                                        <ImageBackground src={item.image} style={styles.productImage}>
                                            <TouchableOpacity onPress={toggleCart} style={styles.cart}>
                                                <FontAwesome
                                                    name={cartIcon}
                                                    size={28}
                                                    color={colors.orange}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={toggleHeart} style={styles.heart}>
                                                <Entypo
                                                    name={heartIcon}
                                                    size={28}
                                                    color={colors.orange}
                                                />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                        <Card.Content style={styles.productText}>
                                            <Text style={styles.productItemTitle}>{item.title}</Text>
                                            <Text style={styles.productPrice}>
                                                {item.price}$
                                            </Text>
                                            <Text style={styles.productDescription}>{item.description}</Text>
                                        </Card.Content>
                                    </Card>
                                </TouchableOpacity>
                            )
                        }}
                        alwaysBounceVertical
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
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
    },
    productWrapper: {
        marginHorizontal: 5,
        marginBottom: 20
    },
    productItemsWrapper: {
        paddingTop: 10,
        marginHorizontal: 5,
        width: 'auto'
    },
    productInnerWrapper: {
        marginHorizontal: 2,
        marginVertical: 5
    },
    productText: {
        color: colors.white,
        marginTop: 10,
        paddingBottom: 10,
    },
    productItemTitle: {
        fontSize: 17,
        color: colors.black,
        fontFamily: 'Poppins_400Regular',
        fontWeight: '700'
    },
    productPrice: {
        marginBottom: 5,
        color: colors.darkGray,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14
    },
    productDescription: {
        fontFamily: 'Poppins_400Regular'
    },
    productImage: {
        height: 200,
        overflow: 'hidden',
        borderRadius: 10
    },
    cart: {
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
    heart: {
        position: 'absolute',
        right: 15,
        bottom: 15,
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
});

export default HomeScreen;