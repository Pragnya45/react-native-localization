import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [value, setValue] = useState(null);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const results = response.data;
      if (results.length === 0) setHasMore(false);
      setData((prevData:any) => [...prevData, ...results.map((item:any) => ({ label: item.title, value: item.id }))]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={value}
        onChange={(item:any) => setValue(item.value)}
        flatListProps={{
          onEndReached: fetchData,
          onEndReachedThreshold: 0.5,
          ListFooterComponent: () => (loading ? <ActivityIndicator size="small" color="blue" /> : null),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  dropdown: { height: 50, borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 8 },
});

export default App;
