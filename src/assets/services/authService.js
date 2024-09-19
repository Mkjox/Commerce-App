import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(username, password) {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        await fetchProfile(username);
    }

    return data;
}

export async function fetchProfile(username) {
    const response = await fetch('https://fakestoreapi.com/users?username=${username}');
    const profile = await response.json();

    await AsyncStorage.setItem('profile', JSON.stringify(profile));
}

export async function logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('profile');
}