import React from 'react';
import { View, Text } from 'react-native';
import siteConfig from '../site.config';
import { styles } from '../src/styles';

export default function Contact(): React.JSX.Element {
  return (
    <View style={[styles.section, styles.graySection]}>
      <Text style={styles.h2}>{siteConfig.contact.heading}</Text>
      <Text style={styles.p}>Phone: {siteConfig.contact.phone}</Text>
      <Text style={styles.p}>Email: {siteConfig.contact.email}</Text>
    </View>
  );
}
