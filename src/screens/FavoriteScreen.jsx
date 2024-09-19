import { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoritesContext from '../assets/context/FavoritesContext';
import { Card } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
// import StoreContext from '../assets/context/context';

const FavoriteScreen = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    if (!favorites || favorites.length === 0) {
        return (
            <SafeAreaView>
                <Text style={styles.emptyText}>No favorites yet!</Text>
            </SafeAreaView>
        );
    };

    const handleRemoveFavorite = (itemId) => {
        removeFavorite(itemId);
    }

    return (
        <SafeAreaView>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>
                    Favorited Items
                </Text>
            </View>
            <FlatList
                alwaysBounceVertical
                showsVerticalScrollIndicator={false}
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productWrapper}>
                        <Card style={styles.productInnerWrapper}>
                            <ImageBackground src={item.image} style={styles.productImage}>
                                <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)} style={styles.heart}>
                                    <Entypo
                                        name='heart'
                                        size={28}
                                        color={colors.orange}
                                    />
                                </TouchableOpacity>
                            </ImageBackground>
                            <Card.Content style={styles.productText}>
                                <Text style={styles.productItemTitle}>{item.title}</Text>
                                <Text style={styles.productPrice}>{item.price}$</Text>
                                <Text style={styles.productDescription}>{item.description}</Text>
                            </Card.Content>
                        </Card>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
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
    productWrapper: {
        marginHorizontal: 10
    },
    productInnerWrapper: {
        marginHorizontal: 2,
        marginVertical: 5
    },
    productImage: {
        height: 200,
        overflow: 'hidden',
        borderRadius: 10
    },
    productText: {
        color: colors.white,
        marginTop: 10,
        paddingBottom: 10,
    },
    productItemTitle: {
        fontSize: 18,
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

export default FavoriteScreen;