import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import siteConfig from '../site.config';
import { styles } from '../src/styles';

export default function About(): React.JSX.Element {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.section, width < 600 && styles.sectionMobile]}>
      <Text style={styles.h2}>{siteConfig.about.heading}</Text>
      <Text style={styles.p}>{siteConfig.about.body}</Text>
    </View>
  );
}
