import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import colors from "../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const height = Dimensions.get("window").height;

const PostDetails = ({ route, navigation }) => {
    const [heart, setHeart] = useState("heart-outlined");
    const { item } = route.params;

    const toggleHeart = () => {
        setHeart(heart === "heart-outlined" ? "heart" : "heart-outlined");
    };

    return (
        <SafeAreaView>
                <View style={styles.container}>
                    <ImageBackground src={item.image} style={styles.backgroundImage}>
                        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                            <Entypo name="chevron-left" size={32} color={colors.black} style={styles.backButton} />
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.informationWrapper}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.priceText}>{item.price}$</Text>
                            </View>
                        </View>
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
    backgroundImage: {
        height: height * 0.499,
        justifyContent: 'space-between',
        marginTop: 10
    },
    informationWrapper: {
        height: 900
    },
    titleWrapper: {
        
    },
    itemTitle: {

    },
    priceWrapper: {

    },
    priceText: {

    }
});

export default PostDetails;