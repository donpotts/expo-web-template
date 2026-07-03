import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native';
import siteConfig from '../site.config';
import { styles } from '../src/styles';

export default function Contact(): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const canSend = name.trim() !== '' && email.trim() !== '' && message.trim() !== '';

  const handleSend = () => {
    if (!canSend) return;
    const subject = `Message from ${name} via website`;
    const body = `${message}\n\n— ${name} (${email})`;
    const url = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url);
    setSent(true);
  };

  return (
    <View style={[styles.section, styles.graySection]}>
      <Text style={styles.h2}>{siteConfig.contact.heading}</Text>
      <Text style={styles.p}>Phone: {siteConfig.contact.phone}</Text>
      <Text style={styles.p}>Email: {siteConfig.contact.email}</Text>

      <View style={formStyles.form}>
        <Text style={formStyles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={formStyles.input}
          placeholder="Your name"
          placeholderTextColor={siteConfig.colors.textSubtle}
        />

        <Text style={formStyles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={formStyles.input}
          placeholder="you@example.com"
          placeholderTextColor={siteConfig.colors.textSubtle}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={formStyles.label}>Message</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={[formStyles.input, formStyles.textArea]}
          placeholder="How can we help?"
          placeholderTextColor={siteConfig.colors.textSubtle}
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity
          onPress={handleSend}
          disabled={!canSend}
          style={[formStyles.button, !canSend && formStyles.buttonDisabled]}
        >
          <Text style={formStyles.buttonText}>Send Message</Text>
        </TouchableOpacity>

        {sent && (
          <Text style={formStyles.sentNote}>
            Your email app should have opened with this message ready to send.
          </Text>
        )}
      </View>
    </View>
  );
}

const formStyles = StyleSheet.create({
  form: { width: '100%', maxWidth: 480, alignSelf: 'center', marginTop: 24 },
  label: { fontSize: 14, fontWeight: '600', color: siteConfig.colors.textMuted, marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: siteConfig.colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: siteConfig.colors.text,
    backgroundColor: siteConfig.colors.background,
    ...Platform.select({ web: { outlineStyle: 'none' } as any, default: {} }),
  },
  textArea: { minHeight: 120, textAlignVertical: 'top' },
  button: {
    marginTop: 20,
    backgroundColor: siteConfig.colors.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  sentNote: { marginTop: 12, textAlign: 'center', color: siteConfig.colors.textSubtle, fontSize: 14 },
});
