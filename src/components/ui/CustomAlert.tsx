import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react-native";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  visible: boolean;
  type?: AlertType;
  title: string;
  message: string;
  onClose: () => void;
  showCloseButton?: boolean;
  onAction?: () => void;
  actionText?: string;
}

const CustomAlert: React.FC<AlertProps> = ({
  visible = false,
  type = "info",
  title,
  message,
  onClose,
  showCloseButton = true,
  onAction,
  actionText,
}) => {
  const getAlertStyle = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle size={24} color={"#16a34a"} />,
          containerStyle: styles.containerSuccess,
          titleStyle: styles.titleSuccess,
          messageStyle: styles.messageSuccess,
        };
      case "error":
        return {
          icon: <XCircle size={24} color={"#dc2626"} />,
          containerStyle: styles.containerError,
          titleStyle: styles.titleError,
          messageStyle: styles.messageError,
        };
      case "warning":
        return {
          icon: <AlertTriangle size={24} color={"#facc15"} />,
          containerStyle: styles.containerWarning,
          titleStyle: styles.titleWarning,
          messageStyle: styles.messageWarning,
        };
      default:
        return {
          icon: <Info size={24} color={"#2563eb"} />,
          containerStyle: styles.containerInfo,
          titleStyle: styles.titleInfo,
          messageStyle: styles.messageInfo,
        };
    }
  };

  const alertStyle = getAlertStyle();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.alertContainer, alertStyle.containerStyle]}>
          <View style={styles.header}>
            {alertStyle.icon}
            <Text style={[styles.title, alertStyle.titleStyle]}>{title}</Text>
          </View>

          <Text style={[styles.message, alertStyle.messageStyle]}>
            {message}
          </Text>

          <View style={styles.actionsContainer}>
            {onAction && actionText && (
              <TouchableOpacity onPress={onAction} style={styles.actionButton}>
                <Text style={styles.actionText}>{actionText}</Text>
              </TouchableOpacity>
            )}

            {showCloseButton && (
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  alertContainer: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  message: {
    fontSize: 14,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#333",
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  containerSuccess: { backgroundColor: "#d1fae5", borderColor: "#16a34a" },
  titleSuccess: { color: "#065f46" },
  messageSuccess: { color: "#047857" },
  containerError: { backgroundColor: "#fee2e2", borderColor: "#dc2626" },
  titleError: { color: "#991b1b" },
  messageError: { color: "#b91c1c" },
  containerWarning: { backgroundColor: "#fef08a", borderColor: "#facc15" },
  titleWarning: { color: "#713f12" },
  messageWarning: { color: "#ca8a04" },
  containerInfo: { backgroundColor: "#dbeafe", borderColor: "#2563eb" },
  titleInfo: { color: "#1e3a8a" },
  messageInfo: { color: "#1d4ed8" },
});

export default CustomAlert;
