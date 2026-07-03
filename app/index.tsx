/// <reference types="react" />
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions, Linking, StyleSheet } from 'react-native';
import siteConfig from '../site.config';
import { styles as shared } from '../src/styles';

// Metro/webpack require() paths must be static string literals, so hero images
// can't be driven from site.config.ts. To change images, replace these files
// in src/images/ (keeping the same filenames) or edit this array directly.
const heroImages = [
  require('../src/images/hero-1.jpg'),
  require('../src/images/hero-2.jpg'),
  require('../src/images/hero-3.jpg'),
  require('../src/images/hero-4.jpg'),
  require('../src/images/hero-5.jpg'),
];

export default function Landing(): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), 4000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
  const next = () => setIndex((i) => (i + 1) % heroImages.length);

  return (
    <View>
      <View style={[localStyles.hero, { height: width < 600 ? Math.min(240, Math.max(160, Math.round(height * 0.25))) : Math.min(720, Math.max(160, Math.round(height * 0.45))) }]}>
        <Image source={heroImages[index]} resizeMode="cover" style={localStyles.heroImage} />
      </View>

      <View style={[localStyles.heroInfo, width >= 900 && localStyles.heroInfoDesktop, width < 600 && localStyles.heroInfoMobile]}>
        <Text style={[localStyles.heroTitle, { fontSize: width >= 900 ? 48 : width > 600 ? 34 : 22 }]}>{siteConfig.hero.title}</Text>
        <Text style={[localStyles.heroSubtitle, { fontSize: width >= 900 ? 20 : width > 600 ? 16 : 15 }]}>{siteConfig.hero.subtitle}</Text>

        <View style={[localStyles.sliderControlsInline, width < 480 && localStyles.sliderControlsInlineMobile]}>
          <TouchableOpacity onPress={prev} style={[localStyles.navBtn, width < 480 && localStyles.navBtnMobile]}><Text style={localStyles.navBtnText}>‹</Text></TouchableOpacity>
          <View style={localStyles.dots}>{heroImages.map((_, i) => <TouchableOpacity key={i} onPress={() => setIndex(i)} style={[localStyles.dot, width < 480 && localStyles.dotMobile, i === index && localStyles.dotActive]} />)}</View>
          <TouchableOpacity onPress={next} style={[localStyles.navBtn, width < 480 && localStyles.navBtnMobile]}><Text style={localStyles.navBtnText}>›</Text></TouchableOpacity>
        </View>
      </View>

      {siteConfig.promo.enabled && (
        <View style={shared.promoBar}>
          <Text style={shared.promoText}>
            {siteConfig.promo.text}{' '}
            <Text style={shared.promoLink} accessibilityRole="link" onPress={() => Linking.openURL(siteConfig.promo.linkUrl)}>{siteConfig.promo.linkText}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  hero: { position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroInfo: { paddingHorizontal: 32, paddingVertical: 20, alignItems: 'center', marginTop: 18, marginBottom: 12, maxWidth: 1100, alignSelf: 'center', width: '100%' },
  heroTitle: { color: siteConfig.colors.text, fontSize: 34, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { color: siteConfig.colors.textMuted, marginTop: 10, textAlign: 'center', lineHeight: 22 },
  heroInfoDesktop: { paddingHorizontal: 32, paddingVertical: 24, marginTop: 20, marginBottom: 16 },
  heroInfoMobile: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 4, marginTop: 4, marginBottom: 0 },
  sliderControlsInline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  sliderControlsInlineMobile: { marginTop: 8 },
  navBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#e6eef9', borderRadius: 6 },
  navBtnMobile: { paddingHorizontal: 8, paddingVertical: 6 },
  navBtnText: { color: siteConfig.colors.accent, fontSize: 24, fontWeight: '700' },
  dots: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
  dot: { width: 8, height: 8, borderRadius: 8, backgroundColor: siteConfig.colors.dot, marginHorizontal: 4 },
  dotMobile: { width: 6, height: 6 },
  dotActive: { backgroundColor: siteConfig.colors.accent, width: 12, height: 12 },
});
