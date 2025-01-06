import { View, Text, SafeAreaView, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useUserStore } from "@/service/userStore";
import InquiryModal from "./InquiryModal";
import { headerStyles } from "@/styles/headerStyles";
import { CircleUser, Menu } from "lucide-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { navigate } from "@/utils/NavigationUtils";

const HomeHeader = () => {
  const [visible, setVisisble] = React.useState(false);

  const { user } = useUserStore();

  useEffect(() => {
    const checkUserName = () => {
      const storedName = user?.name;
    console.log("this is name",storedName)

      if (!storedName) {
        setVisisble(true);
      }
    };
    checkUserName();
  }, []);


  const handleNavigation =() =>{
    const storedName = user?.name;
    console.log("this is name",storedName)

    if(!storedName){
      setVisisble(true);
      return;
    } 
    navigate("JoinMeetScreen")
  }

  return (
    <>
      <SafeAreaView />
      <View style={headerStyles.container}>
        <Menu title="menu" size={RFValue(20)} color={Colors.text} />
        <TouchableOpacity style={headerStyles.textContainer} onPress={handleNavigation}>
          <Text style= {headerStyles.placeholderText}>Enter a meeting code.</Text>
        </TouchableOpacity>

        <CircleUser 
        onPress={() => setVisisble(true)}
        title="menu"
        size={RFValue(20)}
        color={Colors.primary}

        />
      </View>
      <InquiryModal onClose={() => setVisisble(false)} visible={visible} />
    </>
  );
};

export default HomeHeader;
