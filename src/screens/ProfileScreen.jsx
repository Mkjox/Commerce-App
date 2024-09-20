import { Entypo } from "@expo/vector-icons";
import { View, StyleSheet, Text, ActivityIndicator, TextInput } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/colors";
import { useContext, useEffect, useState } from "react";
import { getRequest } from "../assets/services/httpService";
import { BASE_URL, USER_URL } from "../assets/services/url";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../assets/context/AuthContext";

const ProfileScreen = () => {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const { userProfile, handleLogin, handleLogout } = useContext(AuthContext);

    async function getUser() {
        getRequest(`${BASE_URL}${USER_URL}`)
            .then((response) => setData(response?.data))
            .catch((error) => console.log(error));
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    const login = () => {
        handleLogin(username, password);
    };

    const logout = () => {
        handleLogout();
    };

    if (loading) {
        return <ActivityIndicator size="large" color={colors.orange} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {userProfile ? (
                <View style={styles.loggedInWrapper}>
                    <Entypo
                        name='chevron-left'
                        size={26}
                        style={styles.backIcon}
                    />
                    <View style={styles.profileWrapper}>
                        <View style={styles.profileInnerWrapper}>
                            <Avatar.Icon icon style={{ alignSelf: 'center' }} />
                            <View style={styles.nameArea}>
                                <Text style={[styles.text, { textTransform: 'capitalize', fontSize: 18 }]}>{data.name.firstname}</Text>
                                <Text style={[styles.text, { textTransform: 'capitalize', fontSize: 18 }]}>{data.name.lastname}</Text>
                            </View>
                            <Text style={styles.text}>{data.username}</Text>
                            <Text style={styles.text}>{data.email}</Text>
                            <Text style={styles.text}>{data.phone}</Text>
                        </View>
                        <View>
                            {/* <TouchableOpacity>
                        <Text>Edit Profile</Text>
                    </TouchableOpacity> */}

                            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.loggedOutWrapper}>
                    <Text style={styles.loggedOutWarn}>Not logged in.</Text>

                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={[styles.input, { marginTop: 300 }]}
                    />

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={login}>
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    loggedInWrapper: {

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
    nameArea: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginTop: 5,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        textAlign: 'center',
        borderBottomWidth: 0.2,
    },
    loggedOutWarn: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    },
    logoutButton: {
        padding: 10,
        backgroundColor: colors.teallight,
        width: 100,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        bottom: -450
    },
    logoutButtonText: {
        color: colors.white,
        fontSize: 18
    },
    loggedOutWrapper: {
        alignItems: 'center'
    },
    input: {
        padding: 10,
        width: 200,
        marginVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: colors.teallight,
        elevation: 5
    },
    loginButton: {
        marginTop: 230,
        borderRadius: 15,
        width: 150,
        textAlign: 'center',
        backgroundColor: colors.teallight,
        height: 50,
        alignItems: 'center',
        elevation: 5
    },
    loginButtonText: {
        marginTop: 15,
        color: colors.white
    }
})

export default ProfileScreen;