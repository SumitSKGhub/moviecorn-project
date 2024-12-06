import { FlatList, Image, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { Link } from '@react-navigation/native'



type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>



const Details = ({ route }: DetailsProps) => {
  const { contentId } = route.params;
  const [shows, setShow] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchShows();

  }, []);

  const renderItem = ({ item }) => {
    const { show } = item;

    
      const handlePress= (url:string)=> {
        Linking.openURL(url.toString());
      }

    return (
      <View >
        {
          show.id === contentId ?
            (<View>
              <Image source={{ uri: show.image.original }}
                style={styles.image}
              />
              <Text style={styles.title}>{show.name}</Text>

              
              <Text style={styles.text}>Language: {show.language}</Text>
              <Text style={styles.text}>Status: {show.status}</Text>
              <Text style={styles.text}>Runtime: {show.runtime}</Text>
              <Text style={styles.text}>Premiered: {show.premiered}</Text>

              <View style={styles.row}>
              <Text style={styles.text}>Official Site: </ Text>
              <Text style={styles.link} onPress={() => Linking.openURL(show.officialSite)}>{show.officialSite}</Text>
              </View>

              <Text style={styles.text}>Network: {show.network.name}</Text>
              <Text style={styles.text}>NetWork-country: {show.network.country.name}</Text>
              <Text style={styles.text}>NetWork-country-code: {show.network.country.code}</Text>
              <Text style={styles.text}>NetWork-timezone: {show.network.country.timezone}</Text>
              <Text style={styles.heavyText}>Summary: </Text>
              <Text style={styles.text}>{show.summary}</Text>
            </View>)
            : null
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shows}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 10
  },
  title: {
    color: '#E50914',
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  heavyText:{
    fontSize:18,
    color: "#B3B3B3",
    fontWeight:"bold"
  },
  text: {
    fontSize: 14,
    color: "#B3B3B3",
    marginTop: 8,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginTop: 20
  },
  genres: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 8,
    fontStyle: "italic"
  },
  link:{
    fontSize: 16,
    color:'#1E90FF',
    textDecorationLine:'underline'
  },
  row:{
    flexDirection: 'row',
    flexWrap:'wrap'
  }
})