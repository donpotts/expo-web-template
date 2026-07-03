import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { Stack, Link, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import siteConfig from '../site.config';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function RootLayout() {
  const { width } = useWindowDimensions();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={[styles.header, { paddingHorizontal: width > 900 ? 32 : 16 }]}>
        <Text style={[styles.brand, { fontSize: width > 900 ? 20 : 18 }]}>{siteConfig.siteName}</Text>
        <View style={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={[styles.navLink, pathname === link.href && styles.navLinkActive]}
            >
              {link.label}
            </Link>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Stack screenOptions={{ headerShown: false }} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{siteConfig.footer.text}</Text>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { fontSize: 18, fontWeight: '700', color: siteConfig.colors.text },
  nav: { flexDirection: 'row', gap: 20 },
  navLink: { fontSize: 15, color: siteConfig.colors.textMuted, fontWeight: '600' },
  navLinkActive: { color: siteConfig.colors.accent },
  content: { flex: 1 },
  contentContainer: { flexGrow: 1 },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { color: siteConfig.colors.textSubtle },
});
