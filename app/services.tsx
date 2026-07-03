import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import siteConfig from '../site.config';
import { styles } from '../src/styles';

export default function Services(): React.JSX.Element {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.section, styles.graySection]}>
      <Text style={styles.h2}>{siteConfig.services.heading}</Text>
      <View style={styles.servicesGrid}>
        {siteConfig.services.items.map((svc, i) => (
          <View key={i} style={[styles.card, { width: width > 900 ? 240 : width > 600 ? '45%' : '100%' }]}>
            <Text style={styles.cardTitle}>{svc.title}</Text>
            <Text>{svc.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
