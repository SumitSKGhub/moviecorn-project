import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"


type SearchProps = NativeStackScreenProps<RootStackParamList, 'Search'>

const Search = ({ route }: SearchProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [searchQ, setSearchQ] = useState("");
  const [searchR, setSearchR] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchResult = async (search_term: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${search_term}`);
      const json = await response.json();
      setSearchR(json);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = (search_term: string) => {
    setSearchQ(search_term);
    if(search_term.trim()){
      fetchSearchResult(search_term);
    }else{
      setSearchR([]);
    }
  };


  return (
    <View style={styles.container}>
      <Text >Search here</Text>
      <TextInput 
        style={styles.searchIp}
        placeholder=""
        value={searchQ}
        onChangeText={handleSearch}
      />
      {isLoading && <Text style={styles.text}>Loading...</Text>}
      <FlatList 
        data={searchR}
        keyExtractor={(item, index) => `${item.show.id}-${index}`}
        renderItem={({item})=>(
          <TouchableOpacity>
            <Text style={styles.title}>{item.show.name}</Text>
            <Text style={styles.text}>
              {item.show.summary || "no result" }
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 16
  },
  searchIp: {
    backgroundColor:'#FFFFFF',
    padding:12,
    marginBottom:16,
    fontSize:16,
    borderRadius: 8
  },
  text:{
    fontSize:14,
    color:"#B3B3B3",
    marginTop:8
  },
  title:{
    fontSize:18,
    color:"#E50914",
    fontWeight:"bold",
    marginTop:15
  }


})