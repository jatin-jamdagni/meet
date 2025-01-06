import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { homeStyles } from "@/styles/homeStyles";
import HomeHeader from "@/components/home/HomeHeader";
import { Calendar, Video } from "lucide-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useUserStore } from "@/service/userStore";
import { navigate } from "@/utils/NavigationUtils";
import InquiryModal from "@/components/home/InquiryModal";
import { useWS } from "@/service/api/WSProvider";
import { useLiveMeetStore } from "@/service/meetStore";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { addHyphens, removeHyphens } from "@/utils/Helpers";
import { checkSession } from "@/service/api/session";

const HomeScreen = () => {
  const { emit } = useWS();
  const { addSessionId, removeSessionId } = useLiveMeetStore();
  const { user, addSession, removeSession, sessions } = useUserStore();

  const [visible, setVisisble] = React.useState(false);
  const handleNavigation = () => {
    const storedName = user?.name;
    if (!storedName) {
      setVisisble(true);
      return;
    }
    navigate("JoinMeetScreen");
  };

  const renderSessions = ({ item }: { item: any }) => {
    const joinViaSessionId = async (sessionId: string) => {
      const storedName = user?.name;
      if (!storedName) {
        setVisisble(true);
        return;
      }
      const isAvailable = await checkSession(sessionId);

      if (isAvailable) {
        emit("prepare-session", {
          userId: user?.id,
          sessionId: removeHyphens(sessionId),
        });

        addSession(sessionId);
        addSessionId(sessionId);

        navigate("PrepareMeetScreen")
      } else {
        removeSession(sessionId);
        removeSessionId();
        Alert.alert("There is no meeting found!");
      }

     };

    return (
      <View style={homeStyles.sessionContainer}>
        <Calendar size={RFValue(20)} color={Colors.icon} />

        <View style={homeStyles.sessionTextContainer}>
          <Text style={homeStyles.sessionTitle}>{addHyphens(item)}</Text>
          <Text style={homeStyles.sessionTime}>Just join and enjoy party!</Text>
        </View>
        <TouchableOpacity
          style={homeStyles.joinButton}
          onPress={() => joinViaSessionId(item)}
        >
          <Text style={homeStyles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={homeStyles.container}>
      <HomeHeader />

      <FlatList
        data={sessions}
        renderItem={renderSessions}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingVertical: RFValue(15) }}
        ListEmptyComponent={
          <>
            <Image
              source={require("@/assets/images/bg.png")}
              style={homeStyles.img}
            />
            <Text style={homeStyles.title}>
              Video calls and meetings for everyone
            </Text>
            <Text style={homeStyles.subTitle}>
              Join a meeting or start a new one
            </Text>
          </>
        }
      />

      <TouchableOpacity
        style={homeStyles.absoluteButton}
        onPress={handleNavigation}
      >
        <Video size={RFValue(14)} color={"#fff"} />
        <Text style={homeStyles.buttonText}>Join</Text>
      </TouchableOpacity>
      <InquiryModal onClose={() => setVisisble(false)} visible={visible} />
    </View>
  );
};

export default HomeScreen;
