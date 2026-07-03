/// <reference types="react" />
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, Pressable, useWindowDimensions, Linking } from 'react-native';
import siteConfig from '../site.config';

// Metro/webpack require() paths must be static string literals, so hero images
// can't be driven from site.config.ts. To change images, replace these files
// in src/images/ (keeping the same filenames) or edit this array directly.
const heroImages = [
  require('./images/hero-1.jpg'),
  require('./images/hero-2.jpg'),
  require('./images/hero-3.jpg'),
  require('./images/hero-4.jpg'),
  require('./images/hero-5.jpg'),
];

export default function Home(): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeImage, setActiveImage] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<any>(null);
  const lastY = useRef(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), 4000);
    return () => clearInterval(id);
  }, []);

  const openImage = (src: any) => { setActiveImage(src); setModalVisible(true); };

  const prev = () => setIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
  const next = () => setIndex((i) => (i + 1) % heroImages.length);

  const onScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y || 0;
    const h = e.nativeEvent.layoutMeasurement.height || height;
    const contentH = e.nativeEvent.contentSize.height || 1;
    const progress = Math.min(1, y / Math.max(1, contentH - h));
    setScrollProgress(progress);
    const scrollingDown = y > lastY.current;
    if (scrollingDown && (y > 150 || progress > 0.25)) setShowScrollTop(true);
    if (!scrollingDown && y < 150) setShowScrollTop(false);
    lastY.current = y;
  };

  const scrollToTop = () => {
    if (scrollRef.current && scrollRef.current.scrollTo) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView ref={scrollRef} onScroll={onScroll} scrollEventThrottle={16} contentContainerStyle={styles.content} style={styles.scrollView}>
        <View style={[styles.hero, { height: width < 600 ? Math.min(240, Math.max(160, Math.round(height * 0.25))) : Math.min(720, Math.max(160, Math.round(height * 0.45))) }]}>
          <Image source={heroImages[index]} resizeMode="cover" style={styles.heroImage} />
        </View>

        <View style={[styles.heroInfo, width >= 900 && styles.heroInfoDesktop, width < 600 && styles.heroInfoMobile]}>
          <Text style={[styles.heroTitle, { fontSize: width >= 900 ? 48 : width > 600 ? 34 : 22 }]}>{siteConfig.hero.title}</Text>
          <Text style={[styles.heroSubtitle, { fontSize: width >= 900 ? 20 : width > 600 ? 16 : 15 }]}>{siteConfig.hero.subtitle}</Text>

          <View style={[styles.sliderControlsInline, width < 480 && styles.sliderControlsInlineMobile]}>
            <TouchableOpacity onPress={prev} style={[styles.navBtn, width < 480 && styles.navBtnMobile]}><Text style={styles.navBtnText}>‹</Text></TouchableOpacity>
            <View style={styles.dots}>{heroImages.map((_, i) => <TouchableOpacity key={i} onPress={() => setIndex(i)} style={[styles.dot, width < 480 && styles.dotMobile, i === index && styles.dotActive]} />)}</View>
            <TouchableOpacity onPress={next} style={[styles.navBtn, width < 480 && styles.navBtnMobile]}><Text style={styles.navBtnText}>›</Text></TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, width < 600 && styles.sectionMobile]}>
          <Text style={styles.h2}>{siteConfig.about.heading}</Text>
          <Text style={styles.p}>{siteConfig.about.body}</Text>
        </View>

        {siteConfig.promo.enabled && (
          <View style={styles.promoBar}>
            <Text style={styles.promoText}>
              {siteConfig.promo.text}{' '}
              <Text style={styles.promoLink} accessibilityRole="link" onPress={() => Linking.openURL(siteConfig.promo.linkUrl)}>{siteConfig.promo.linkText}</Text>
            </Text>
          </View>
        )}

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

        <View style={[styles.section, styles.graySection]}>
          <Text style={styles.h2}>{siteConfig.contact.heading}</Text>
          <Text style={styles.p}>Phone: {siteConfig.contact.phone}</Text>
          <Text style={styles.p}>Email: {siteConfig.contact.email}</Text>
        </View>

        <View style={styles.footer}><Text style={styles.footerText}>{siteConfig.footer.text}</Text></View>

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalBG}><View style={[styles.modalContent, { maxWidth: Math.min(1000, width - 40) }]}>{activeImage && <Image source={activeImage} style={[styles.modalImage, { height: Math.min(700, Math.round(height * 0.8)) }]} resizeMode="contain" />}
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}><Text style={styles.closeTxt}>Close</Text></Pressable>
          </View></View>
        </Modal>
      </ScrollView>

      {/* custom vertical scrollbar (appears while scrolling) */}
      {showScrollTop && (
        <View style={[styles.scrollbarContainer, { top: 80, height: Math.max(120, height - 160), pointerEvents: 'none' }]}>
          <View style={styles.scrollbarTrack} />
          <View style={[styles.scrollbarThumb, { top: Math.max(0, Math.round((Math.max(120, height - 160) - Math.max(36, Math.round(Math.max(120, height - 160) * 0.08))) * scrollProgress)), height: Math.max(36, Math.round(Math.max(120, height - 160) * 0.08)), pointerEvents: 'none' }]} />
        </View>
      )}

      {/* scroll-to-top button */}
      {showScrollTop && (
        <TouchableOpacity accessibilityLabel="Scroll to top" onPress={scrollToTop} style={styles.scrollTopBtn}>
          <Text style={styles.scrollTopTxt}>^</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 40 },
  hero: { position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroInfo: { paddingHorizontal: 32, paddingVertical: 20, alignItems: 'center', marginTop: 18, marginBottom: 12, maxWidth: 1100, alignSelf: 'center', width: '100%' },
  heroTitle: { color: siteConfig.colors.text, fontSize: 34, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { color: siteConfig.colors.textMuted, marginTop: 10, textAlign: 'center', lineHeight: 22 },
  section: { padding: 20, maxWidth: 1100, alignSelf: 'center', width: '100%', marginTop: 18 },
  sectionMobile: { marginTop: 8 },
  graySection: { backgroundColor: siteConfig.colors.surfaceAlt },
  h2: { fontSize: 26, fontWeight: '700', marginBottom: 14, textAlign: 'center' },
  p: { textAlign: 'center', lineHeight: 26, fontSize: 16 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  card: { width: 240, backgroundColor: siteConfig.colors.background, padding: 12, margin: 8, borderRadius: 8, elevation: 2, boxShadow: '0px 2px 6px rgba(0,0,0,0.05)' },
  cardTitle: { fontWeight: '700', marginBottom: 6, fontSize: 18 },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { color: siteConfig.colors.textSubtle },
  promoBar: { paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center', marginHorizontal: 20, marginBottom: 12 },
  promoText: { color: siteConfig.colors.textMuted, fontWeight: '600', textAlign: 'center', fontSize: 16 },
  promoLink: { color: siteConfig.colors.accent, textDecorationLine: 'underline' },
  modalBG: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', maxWidth: 900, backgroundColor: '#000', padding: 12, borderRadius: 8, alignItems: 'center' },
  modalImage: { width: '100%', height: 600 },
  closeBtn: { marginTop: 12, padding: 10, backgroundColor: '#fff', borderRadius: 6 },
  closeTxt: { color: '#000' },
  sliderControlsInline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  navBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#e6eef9', borderRadius: 6 },
  navBtnText: { color: siteConfig.colors.accent, fontSize: 24, fontWeight: '700' },
  dots: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
  dot: { width: 8, height: 8, borderRadius: 8, backgroundColor: siteConfig.colors.dot, marginHorizontal: 4 },
  dotActive: { backgroundColor: siteConfig.colors.accent, width: 12, height: 12 },
  heroInfoDesktop: { paddingHorizontal: 32, paddingVertical: 24, marginTop: 20, marginBottom: 16 },
  heroInfoMobile: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 4, marginTop: 4, marginBottom: 0 },
  sliderControlsInlineMobile: { marginTop: 8 },
  navBtnMobile: { paddingHorizontal: 8, paddingVertical: 6 },
  dotMobile: { width: 6, height: 6 },
  wrapper: { flex: 1 },
  scrollView: { flex: 1 },
  scrollbarContainer: { position: 'absolute', right: 12, width: 8, justifyContent: 'flex-start', alignItems: 'center' },
  scrollbarTrack: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 4 },
  scrollbarThumb: { position: 'absolute', left: 0, right: 0, width: 8, backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 4 },
  scrollTopBtn: { position: 'absolute', right: 18, bottom: 28, backgroundColor: siteConfig.colors.accent, width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', elevation: 6, boxShadow: '0px 3px 6px rgba(0,0,0,0.3)' },
  scrollTopTxt: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: -2 },
});
