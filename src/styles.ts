import { StyleSheet } from 'react-native';
import siteConfig from '../site.config';

export const styles = StyleSheet.create({
  page: { paddingBottom: 40 },
  section: { padding: 20, maxWidth: 1100, alignSelf: 'center', width: '100%', marginTop: 18 },
  sectionMobile: { marginTop: 8 },
  graySection: { backgroundColor: siteConfig.colors.surfaceAlt },
  h2: { fontSize: 26, fontWeight: '700', marginBottom: 14, textAlign: 'center', color: siteConfig.colors.text },
  p: { textAlign: 'center', lineHeight: 26, fontSize: 16, color: siteConfig.colors.text },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  card: { width: 240, backgroundColor: siteConfig.colors.background, padding: 12, margin: 8, borderRadius: 8, elevation: 2, boxShadow: '0px 2px 6px rgba(0,0,0,0.05)' },
  cardTitle: { fontWeight: '700', marginBottom: 6, fontSize: 18, color: siteConfig.colors.text },
  promoBar: { paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center', marginHorizontal: 20, marginBottom: 12 },
  promoText: { color: siteConfig.colors.textMuted, fontWeight: '600', textAlign: 'center', fontSize: 16 },
  promoLink: { color: siteConfig.colors.accent, textDecorationLine: 'underline' },
});
