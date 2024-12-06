import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function ElevatedCards() {

  getImages();
  var PHOTO_DATA;

  function getImages(){
    return fetch('https://api.tvmaze.com/search/shows?q=all')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      PHOTO_DATA=json;
    })
    .catch((error)=>{
      console.error(error);
    });
  }



    const [data, setData] = useState([]);

    const getAPIData= async ()=>{
        const url="https://api.tvmaze.com/search/shows?q=all";
        let result= await fetch(url);
        result = await result.json();
        setData(result);
    
        console.warn("Calling..")
        
        //api call
      }

      useEffect(() => {
        getAPIData();
    
      }, []);


  return (
    <View>
    <ScrollView horizontal={true} style={styles.container}>
    {
        data.length ?
        data.map((item)=><View>
          <View style={[styles.card, styles.cardEleveted]}>
            <View>
            <Image 
            
            style={styles.card}
            />
            </View>
          
        </View>
          
        </View>)
        :null
    }
    </ScrollView>
    <FlatList 
      data={PHOTO_DATA}
      renderItem={({item}) => <Item user_name={item.show.image.medium} />}
    />
    <Text style={styles.headingText}>Trending Now</Text>
    <View style={[styles.card,styles.cardEleveted]}>
      <Image 
        source={{uri: 'https://static.tvmaze.com/uploads/images/medium_portrait/425/1064746.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/425/1064746.jpg'}}
        style={styles.card}
      />
      
    </View>


</View>


  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    container:{
        padding: 8
    },
    card:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height:300,
        borderRadius: 4,
        margin: 8,
        color: '#000000'
    },
    cardEleveted:{
        backgroundColor:'#a80404',
        elevation: 15,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#EF5354',
        shadowOpacity: 0.4,
        shadowRadius: 2
    }
})