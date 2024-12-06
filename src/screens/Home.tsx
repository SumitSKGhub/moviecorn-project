import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Shows from '../../components/Shows'

//navigation
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../../App'






type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.searchButton}
          onPress={() => navigation.navigate("Search")}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <Text style={styles.headingText}>Trending</Text>
        <Shows />
        <Text style={styles.headingText}>Popular</Text>
        <Shows />
        <Text style={styles.headingText}>Latest</Text>
        <Shows />

      </ScrollView>
    </View>

  );
};



export default Home

const styles = StyleSheet.create({
  headingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    backgroundColor: "#141414",
    color: '#FFFFFF',
    marginTop: 8
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#141414"
  },
  smallText: {
    color: '#000000'
  },
  searchButton: {
    backgroundColor: "#E50914", // Netflix-inspired red
    paddingVertical: 12, // Vertical padding for button height
    paddingHorizontal: 20, // Horizontal padding for width
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    marginTop: 15, // Spacing from other elements
  },
  searchButtonText: {
    fontSize: 16, // Standard font size
    color: "#FFFFFF", // White text for contrast
    fontWeight: "bold", // Bold text for emphasis
    textTransform: "uppercase", // Uppercase text for button look
  },
})