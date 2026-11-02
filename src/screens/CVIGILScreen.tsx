import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { MCC_VIOLATION_TYPES, INDIA_STATES } from '../data/mockData';

interface CVIGILScreenProps {
  onBack: () => void;
}

export const CVIGILScreen: React.FC<CVIGILScreenProps> = ({ onBack }) => {
  const [selectedMedia, setSelectedMedia] = useState<'photo' | 'video' | 'audio' | null>(null);
  const [capturedLocation, setCapturedLocation] = useState('Probable location will appear here after capturing media');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [timer, setTimer] = useState(295); // 4:55 countdown

  const handleMediaCapture = (type: 'photo' | 'video' | 'audio') => {
    setSelectedMedia(type);
    setCapturedLocation('Gole Market, Connaught Place, New Delhi, Delhi 110001, India');
    Alert.alert(
      `${type.charAt(0).toUpperCase() + type.slice(1)} Captured`,
      `Your ${type} evidence has been captured and attached to the complaint.`,
    );
  };

  const handleSubmit = async () => {
    if (!complaintType || !description.trim() || !selectedState) {
      Alert.alert('Incomplete Form', 'Please select complaint type, state, and add a description.');
      return;
    }
    if (!selectedMedia) {
      Alert.alert('Evidence Required', 'Please capture a Photo, Video, or Audio as evidence before submitting.');
      return;
    }

    setSubmitting(true);
    // Simulate network call
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(
        'Complaint Submitted',
        `Your MCC violation complaint has been registered.\n\nComplaint ID: cVIGIL-${Math.floor(Math.random() * 900000 + 100000)}\n\nThe field team has been alerted.`,
        [{ text: 'OK', onPress: onBack }],
      );
    }, 2000);
  };

  const handleReset = () => {
    setSelectedMedia(null);
    setComplaintType('');
    setDescription('');
    setSelectedState('');
    setSelectedDistrict('');
    setCapturedLocation('Probable location will appear here after capturing media');
  };

  return (
    <View style={styles.container}>
      {/* cVIGIL Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.eyeLogo}>
            <MaterialCommunityIcons name="eye-outline" size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>cVIGIL</Text>
            <Text style={styles.headerSub}>Election Commission of India</Text>
          </View>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Media Preview Box */}
        <View style={styles.mediaPreviewBox}>
          {selectedMedia === 'photo' ? (
            <View style={styles.mediaPlaceholder}>
              <MaterialCommunityIcons name="image-outline" size={60} color="#CCCCCC" />
              <Text style={styles.mediaCaptionText}>Photo captured</Text>
            </View>
          ) : selectedMedia === 'video' ? (
            <View style={styles.mediaPlaceholder}>
              <MaterialCommunityIcons name="video-outline" size={60} color="#CCCCCC" />
              <Text style={styles.mediaCaptionText}>Video recorded</Text>
            </View>
          ) : selectedMedia === 'audio' ? (
            <View style={styles.mediaPlaceholder}>
              <MaterialCommunityIcons name="waveform" size={60} color="#CCCCCC" />
              <Text style={styles.mediaCaptionText}>Audio recorded</Text>
            </View>
          ) : (
            <View style={styles.mediaPlaceholder}>
              <MaterialCommunityIcons name="image-off-outline" size={50} color="#DDDDDD" />
              <Text style={[styles.mediaCaptionText, { color: '#BBBBBB' }]}>
                No media captured yet
              </Text>
            </View>
          )}
        </View>

        {/* Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <MaterialCommunityIcons name="map-marker" size={18} color={COLORS.error} />
            <Text style={styles.locationTitle}>Probable Captured Location</Text>
          </View>
          <Text style={styles.locationAddress}>{capturedLocation}</Text>
          <TouchableOpacity style={styles.addLocationBtn}>
            <MaterialCommunityIcons name="plus-circle-outline" size={16} color={COLORS.primary} />
            <Text style={styles.addLocationText}>Give additional location info</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* State */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>State*</Text>
            <Text style={styles.fieldValue}>{selectedState || 'Select State'}</Text>
            <TouchableOpacity onPress={() => setShowStateDropdown(!showStateDropdown)}>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          {showStateDropdown && (
            <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
              {INDIA_STATES.map(state => (
                <TouchableOpacity
                  key={state}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedState(state);
                    setShowStateDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{state}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <View style={styles.dividerLine} />

          {/* District */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>District*</Text>
            <TextInput
              style={styles.inlineInput}
              placeholder="Enter District"
              placeholderTextColor="#AAAAAA"
              value={selectedDistrict}
              onChangeText={setSelectedDistrict}
            />
          </View>

          <View style={styles.dividerLine} />

          {/* Complaint Type */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Type*</Text>
            <Text style={[styles.fieldValue, { flex: 1 }]}>
              {complaintType || 'Select Type'}
            </Text>
            <TouchableOpacity onPress={() => setShowTypeDropdown(!showTypeDropdown)}>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          {showTypeDropdown && (
            <View style={styles.dropdown}>
              {MCC_VIOLATION_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setComplaintType(type);
                    setShowTypeDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.dividerLine} />

          {/* Description */}
          <Text style={styles.descLabel}>Description</Text>
          <TextInput
            style={styles.descInput}
            placeholder="As you selected Other as Incidence type, description here is mandatory..."
            placeholderTextColor="#AAAAAA"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>
                Submit ({Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')})
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Media Capture Buttons at bottom */}
      <View style={styles.mediaBar}>
        <TouchableOpacity
          style={[styles.mediaBtn, styles.mediaBtnPhoto, selectedMedia === 'photo' && styles.mediaBtnActive]}
          onPress={() => handleMediaCapture('photo')}
        >
          <MaterialCommunityIcons name="camera-outline" size={32} color="#FFFFFF" />
          <Text style={styles.mediaBtnLabel}>PHOTO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mediaBtn, styles.mediaBtnVideo, selectedMedia === 'video' && styles.mediaBtnActive]}
          onPress={() => handleMediaCapture('video')}
        >
          <MaterialCommunityIcons name="video-outline" size={32} color="#FFFFFF" />
          <Text style={styles.mediaBtnLabel}>VIDEO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mediaBtn, styles.mediaBtnAudio, selectedMedia === 'audio' && styles.mediaBtnActive]}
          onPress={() => handleMediaCapture('audio')}
        >
          <MaterialCommunityIcons name="volume-high" size={32} color="#FFFFFF" />
          <Text style={styles.mediaBtnLabel}>AUDIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cvigilRed,
    paddingTop: 46,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  backBtn: { padding: 4 },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  eyeLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  mediaPreviewBox: {
    backgroundColor: '#E8E8E8',
    height: 180,
    margin: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mediaPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  mediaCaptionText: { color: '#888888', fontSize: 13 },

  locationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  locationTitle: { fontSize: 13, fontWeight: '700', color: '#333' },
  locationAddress: { fontSize: 12.5, color: '#555', lineHeight: 18 },
  addLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  addLocationText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },

  formSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 10,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  fieldLabel: { fontSize: 13, color: '#444', fontWeight: '600', width: 70 },
  fieldValue: { fontSize: 13, color: '#222', fontWeight: '500' },
  inlineInput: { flex: 1, fontSize: 13, color: '#222' },
  dividerLine: { height: 1, backgroundColor: '#F0F0F0' },
  descLabel: { fontSize: 13, fontWeight: '600', color: '#444', marginTop: 8, marginBottom: 4 },
  descInput: {
    fontSize: 13,
    color: '#222',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  dropdown: {
    maxHeight: 200,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginVertical: 4,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownText: { fontSize: 13, color: '#333' },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 12,
    marginTop: 14,
  },
  resetBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#555',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  resetBtnText: { fontSize: 14, fontWeight: '700', color: '#333' },
  submitBtn: {
    flex: 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#888' },
  submitBtnText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },

  mediaBar: {
    gap: 0,
    paddingHorizontal: 12,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#F5F5F5',
  },
  mediaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  mediaBtnActive: { opacity: 0.7 },
  mediaBtnPhoto: { backgroundColor: '#2196F3' },
  mediaBtnVideo: { backgroundColor: '#FF5722' },
  mediaBtnAudio: { backgroundColor: '#FF9800' },
  mediaBtnLabel: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', letterSpacing: 2 },
});
