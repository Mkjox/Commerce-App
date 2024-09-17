import { FlatList, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getRequest } from '../assets/services/httpService'
import { BASE_URL, PRODUCTS_URL } from "../assets/services/url";

const CategoryScreen = () => {
    const [categories, setCategories] = useState();

    const getCategories = () => {
        getRequest(`${BASE_URL}${PRODUCTS_URL}/categories`)
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <View>
            <Text>This is Category Screen</Text>
        </View>
    )

}

export default CategoryScreen;