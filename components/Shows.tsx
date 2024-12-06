import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList2 = {
    Details: { contentId: string }
};
const Stack = createNativeStackNavigator<RootStackParamList2>()
export default function Shows() {
    const [shows, setShows] = useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
                const data = await response.json();
                setShows(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchShows();
    }, []);
    const renderItem = ({ item }) => {
        const { show } = item;
        return (

            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("Details", { contentId: show.id })}
            >
                {show.image && show.image.medium ? (
                    <Image source={{ uri: show.image.medium }} style={styles.image} />
                ) : (<Text >No Image</Text>)}
                <Text style={styles.title}>{show.name}</Text>
                <Text style={styles.text}>{show.summary}</Text>
            </TouchableOpacity>
        );
    };
    return (

        <View style={styles.container}>
            <FlatList horizontal={true}
                data={shows}
                keyExtractor={(item) => item.show.id.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: false ? '#141414' : '#141414',
        padding: 10,
    },
    item: {
        marginBottom: 20,
        alignItems: "center",
        padding: 8
    },
    image: {
        width: 150,
        height: 200,
        resizeMode: "cover",
        borderRadius: 8,
    },
    title: {
        color: '#E50914',
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        fontSize: 14,
        color: "#B3B3B3",
        lineHeight: 20,
        width: 150,
        height: 100,
        marginTop: 8,
        textAlign: "justify",
    }
})