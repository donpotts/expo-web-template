import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Home from './src/Home';
import siteConfig from './site.config';

export default function App() {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={[styles.header, { paddingHorizontal: width > 900 ? 32 : 16 }]}>
        <Text style={[styles.brand, { fontSize: width > 900 ? 20 : 18 }]}>{siteConfig.siteName}</Text>
      </View>

      <View style={styles.content}>
        <Home />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: siteConfig.colors.background },
  header: {
    height: 64,
    backgroundColor: siteConfig.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: siteConfig.colors.border,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  brand: { fontSize: 18, fontWeight: '700', color: siteConfig.colors.text },
  content: { flex: 1 },
});
