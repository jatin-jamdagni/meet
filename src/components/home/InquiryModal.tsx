import "react-native-get-random-values";
import {
  View,
  Text,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useUserStore } from "@/service/userStore";
import { v4 as uuidv4 } from "uuid";
import { inquiryStyles } from "@/styles/inquiryStyles";
interface InquiryModalProps {
  onClose: () => void;
  visible: boolean;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ onClose, visible }) => {
  const { setUser, user } = useUserStore();
 
  const [name, setName] = React.useState("");
  const [profileUrl, setProfileUrl] = React.useState("https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  useEffect(() => {
    if (visible) {
      const storedName = user?.name;
      const storedProfileUrl = user?.photo;
      setName(storedName || "");
      setProfileUrl(
        storedProfileUrl ||
        ""
      );
    }
  }, []);

  const handleSave = () => {
    if (name && profileUrl) {
      setUser({ id: uuidv4(), name, photo: profileUrl });
      onClose();
    } else {
      Alert.alert("Please fill all the fields");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={inquiryStyles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={inquiryStyles.keyboardAvoidingView}
          >
            <ScrollView contentContainerStyle={inquiryStyles.scrollViewContent}>
              <View style={inquiryStyles.modalContent}>
                <View style={inquiryStyles.modalHandle}></View>

                <Text style={inquiryStyles.title}>Enter Your Details</Text>
                <TextInput
                  style={inquiryStyles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={"#666"}
                />
                <TextInput
                  style={inquiryStyles.input}
                  placeholder="Enter your profile url"
                  value={profileUrl}
                  keyboardType="url"
                  onChangeText={setProfileUrl}
                  placeholderTextColor={"#666"}
                />

                <View style={inquiryStyles.buttonContainer}>
                  <TouchableOpacity
                    style={inquiryStyles.button}
                    onPress={handleSave}
                  >
                    <Text style={inquiryStyles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[inquiryStyles.button, inquiryStyles.cancelButton]}
                    onPress={handleSave}
                  >
                    <Text style={inquiryStyles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InquiryModal;
