import { Entypo } from "@expo/vector-icons";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import { useEffect, useState } from "react";
import { getRequest } from "../assets/services/httpService";
import { BASE_URL, USER_URL } from "../assets/services/url";

const ProfileScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        getRequest(`${BASE_URL}${USER_URL}`)
            .then((response) => setData(response?.data))
            .catch((error) => console.log(error));
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color={colors.orange} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Entypo
                name='chevron-left'
                size={26}
                style={styles.backIcon}
            />
            <View style={styles.profileWrapper}>
                <View style={styles.profileInnerWrapper}>
                    <Text style={[styles.text, { textTransform: 'capitalize' }]}>{data.name.firstname}</Text>
                    <Text style={[styles.text, { textTransform: 'capitalize' }]}>{data.name.lastname}</Text>
                    <Text style={styles.text}>{data.email}</Text>
                    <Text style={styles.text}>{data.phone}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backIcon: {
        marginLeft: 15,
        marginTop: 15
    },
    profileWrapper: {
        alignItems: 'center'
    },
    profileInnerWrapper: {
    },
    text: {
        marginTop: 5,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        textAlign: 'center'
    }
})

export default ProfileScreen;