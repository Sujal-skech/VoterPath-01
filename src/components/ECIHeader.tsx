import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface ECIHeaderProps {
  onMenuPress?: () => void;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  subtitle?: string;
}

export const ECIHeader: React.FC<ECIHeaderProps> = ({
  onMenuPress,
  onProfilePress,
  onNotificationPress,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Top row: profile | branding | hamburger */}
      <View style={styles.row}>
        {/* Left: Profile icon */}
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={30}
          color="rgba(255,255,255,0.9)"
          onPress={onProfilePress}
        />

        {/* Center: Logo + Name */}
        <View style={styles.center}>
          {/* ECI Emblem placeholder circle */}
          <View style={styles.emblemCircle}>
            <MaterialCommunityIcons name="vote" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.brandText}>
            <Text style={styles.orgHindi}>भारत निर्वाचन आयोग</Text>
            <Text style={styles.orgEnglish}>Election Commission of India</Text>
          </View>
          {/* ECINET tag */}
          <View style={styles.ecinetTag}>
            <Text style={styles.ecinetText}>ECINET</Text>
          </View>
        </View>

        {/* Right: Notification + Hamburger */}
        <View style={styles.rightActions}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="rgba(255,255,255,0.9)"
            onPress={onNotificationPress}
          />
          <MaterialCommunityIcons
            name="menu"
            size={28}
            color="rgba(255,255,255,0.9)"
            onPress={onMenuPress}
          />
        </View>
      </View>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingTop: 44,
    paddingBottom: 12,
    paddingHorizontal: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  emblemCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    alignItems: 'center',
  },
  orgHindi: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  orgEnglish: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  ecinetTag: {
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  ecinetText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});
