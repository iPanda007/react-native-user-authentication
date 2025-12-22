import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StunningAlertProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  buttonText?: string;
  cancelButtonText?: string;
  onButtonPress: () => void;
  onCancelPress?: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
}

const { width, height } = Dimensions.get('window');

export default function StunningAlert({
  visible,
  title,
  message,
  icon = 'checkmark-circle',
  iconColor = '#10b981',
  buttonText = 'OK',
  cancelButtonText = 'Cancel',
  onButtonPress,
  onCancelPress,
  type = 'success',
}: StunningAlertProps) {
  const getAlertColors = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: '#10b981',
          iconColor: '#10b981',
        };
      case 'error':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: '#ef4444',
          iconColor: '#ef4444',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: '#f59e0b',
          iconColor: '#f59e0b',
        };
      default:
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: '#3b82f6',
          iconColor: '#3b82f6',
        };
    }
  };

  const colors = getAlertColors();

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={onCancelPress || onButtonPress}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={[styles.alertCard, { 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: colors.borderColor,
            borderWidth: 2,
          }]}>

            <View style={[styles.iconContainer, { backgroundColor: colors.backgroundColor }]}>
              <Ionicons name={icon} size={48} color={colors.iconColor} />
            </View>


            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>


            <View style={styles.buttonContainer}>
              {onCancelPress && (
                <TouchableOpacity
                  style={[styles.cancelButton, { borderColor: colors.borderColor }]}
                  onPress={onCancelPress}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.borderColor }]}>
                    {cancelButtonText}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: colors.iconColor }]}
                onPress={onButtonPress}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    maxWidth: 450,
  },
  alertCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 100,
    flex: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  confirmButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
    flex: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});