import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, CARD_STYLES } from '../theme/colors';

interface ServiceGridItem {
  id: string;
  title: string;
  icon: string;
  colorIdx: number;
}

interface ServiceGridProps {
  items: ServiceGridItem[];
  onPress: (id: string) => void;
  columns?: number;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  items,
  onPress,
  columns = 2,
}) => {
  const rows: ServiceGridItem[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <View style={styles.grid}>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((item) => {
            const palette = CARD_STYLES[item.colorIdx % CARD_STYLES.length];
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: palette.bg,
                    borderColor: palette.border,
                  },
                  row.length === 1 && styles.cardFull,
                ]}
                onPress={() => onPress(item.id)}
                activeOpacity={0.75}
              >
                <View style={[styles.iconCircle, { backgroundColor: palette.iconBg }]}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={28}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
          {/* Fill empty slot in last row with an invisible placeholder */}
          {row.length < columns &&
            Array.from({ length: columns - row.length }).map((_, i) => (
              <View key={`empty-${i}`} style={[styles.card, styles.cardEmpty]} />
            ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    // Shadow
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    minHeight: 110,
  },
  cardFull: {
    flex: 0,
    width: '48%',
    alignSelf: 'center',
  },
  cardEmpty: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 17,
  },
});
