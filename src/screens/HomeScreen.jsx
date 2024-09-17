import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import colors from '../assets/colors/colors';
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getRequest } from '../assets/services/httpService';
import { BASE_URL, PRODUCTS_URL } from "../assets/services/url";

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    async function getPosts() {
        getRequest(`${BASE_URL}${PRODUCTS_URL}`)
            .then((response) => setData(response?.data))
            .catch((error) => console.log(error));
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color={colors.orange} />;
    }

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
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Card
                                style={styles.productInnerWrapper}
                                onPress={() => navigation.navigate("ProductDetails", { item: item })}>
                                <ImageBackground src={item.image}>
                                    <TouchableOpacity onPress={''} style={styles.heart}>
                                        <Entypo
                                            name={"heart"}
                                            size={28}
                                            color={colors.orange}
                                        />
                                    </TouchableOpacity>
                                </ImageBackground>
                                <Card.Content style={styles.productText}>
                                    <Text style={styles.productItemTitle}>{item.title}</Text>
                                    <Text style={styles.productPrice}>
                                        <MaterialIcons
                                            name='money'
                                            size={15}
                                            color={colors.darkGray}
                                        />
                                        {item.price}
                                    </Text>
                                    <Text style={styles.productDescription}>{item.description}</Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                    alwaysBounceVertical
                    showsVerticalScrollIndicator={false}
                />
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