import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { loginWithEmail, registerWithEmail, loginAsGuest } from '../services/firebaseService';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  onClose,
  onSuccess
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      if (isSignUp) {
        await registerWithEmail(email.trim(), password);
      } else {
        await loginWithEmail(email.trim(), password);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication failed.';
      if (msg.includes('auth/invalid-email')) msg = 'Invalid email address format.';
      if (msg.includes('auth/wrong-password') || msg.includes('auth/invalid-credential'))
        msg = 'Incorrect email or password.';
      if (msg.includes('auth/user-not-found')) msg = 'No account found with this email.';
      if (msg.includes('auth/email-already-in-use')) msg = 'This email is already registered.';
      if (msg.includes('auth/weak-password')) msg = 'Password should be at least 6 characters.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      await loginAsGuest();
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Guest auth error:', err);
      setErrorMessage(err.message || 'Failed to sign in as guest.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <MaterialCommunityIcons name="vote" size={24} color="#38BDF8" />
              <Text style={styles.title}>
                {isSignUp ? 'Create Voter Account' : 'Sign In to VoterPath'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialCommunityIcons name="close" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Connect with Firebase project <Text style={styles.boldText}>voterpath-01</Text> to sync your saved candidates, polling alerts, and voting guide notes.
          </Text>

          {/* Error Banner */}
          {errorMessage ? (
            <View style={styles.errorBox}>
              <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#EF4444" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="email-outline" size={18} color="#64748B" />
              <TextInput
                style={styles.input}
                placeholder="voter@example.com"
                placeholderTextColor="#64748B"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="lock-outline" size={18} color="#64748B" />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#64748B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Switch Mode */}
          <TouchableOpacity
            style={styles.switchModeBtn}
            onPress={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage('');
            }}
          >
            <Text style={styles.switchModeText}>
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Guest Mode */}
          <TouchableOpacity
            style={styles.guestBtn}
            onPress={handleGuest}
            disabled={loading}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="incognito" size={18} color="#94A3B8" />
            <Text style={styles.guestBtnText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 22,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: '#334155'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  closeBtn: {
    padding: 4
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 16
  },
  boldText: {
    color: '#38BDF8',
    fontWeight: '600'
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EF4444',
    marginBottom: 14
  },
  errorText: {
    fontSize: 12,
    color: '#FCA5A5',
    flex: 1
  },
  formGroup: {
    marginBottom: 14
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 6
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 8
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  switchModeBtn: {
    alignItems: 'center',
    marginTop: 12
  },
  switchModeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#38BDF8'
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155'
  },
  dividerText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '700'
  },
  guestBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#334155'
  },
  guestBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8'
  }
});
