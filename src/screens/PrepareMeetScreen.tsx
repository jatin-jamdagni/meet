import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useWS } from "@/service/api/WSProvider";
import { useLiveMeetStore } from "@/service/meetStore";
import { useUserStore } from "@/service/userStore";
import { mediaDevices, MediaStream, RTCView } from "react-native-webrtc";
import { addHyphens, requestPermissions } from "@/utils/Helpers";
import { replace } from "@/utils/NavigationUtils";
import { prepareStyles } from "@/styles/prepareStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  EllipsisVertical,
  Info,
  Mic,
  MicOff,
  MonitorIcon,
  Share,
  Shield,
  Video,
  VideoOff,
} from "lucide-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "@/utils/Constants";
const PrepareMeetScreen = () => {
  const { emit, on, off } = useWS();
  const { addParticipant, sessionId, addSessionId, toggle, micOn, videoOn } =
    useLiveMeetStore();
  const { user } = useUserStore();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    const handleParticipantUpdate = (updatedParticipants: any) => {
      setParticipants(updatedParticipants?.participantss);
    };
    on("session-info", handleParticipantUpdate);

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        localStream.release();
      }
      setLocalStream(null);
      off("session-info");
    };
  }, [sessionId, emit, on, off]);

  const showMediaDevices = (audio: any, video: any) => {
    mediaDevices
      .getUserMedia({
        audio,
        video,
      })
      .then((stream) => {
        setLocalStream(stream);
        const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0];

        if (audioTrack) {
          audioTrack.enabled = audio;
        }
        if (videoTrack) {
          videoTrack.enabled = video;
        }
      })
      .catch((err) => {
        console.log("Error in getting Media Devices: ", err);
      });
  };

  const toogleMicState = (newState: any) => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];

      if (audioTrack) {
        audioTrack.enabled = newState;
      }
    }
  };

  const toogleVideoState = (newState: any) => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];

      if (videoTrack) {
        videoTrack.enabled = newState;
      }
    }
  };

  const toggleLocal = (type: "video" | "mic") => {
    if (type === "video") {
      const newVideoState = !videoOn;
      toogleVideoState(newVideoState);
      toggle("video");
    }
    if (type === "mic") {
      const newMicState = !micOn;
      toogleMicState(newMicState);
      toggle("mic");
    }
  };
  const fetchMediaPermissions = async () => {
    const result = await requestPermissions();
    if (result.isCameraGranted) {
      toggleLocal("video");
    }
    if (result.isMicrophoneGranted) {
      toggleLocal("mic");
    }

    showMediaDevices(result.isMicrophoneGranted, result.isCameraGranted);
  };

  useEffect(() => {
    fetchMediaPermissions();
  }, []);

  const handleStart = () => {
    try {
      emit("join-session", {
        name: user?.name,
        photo: user?.photo,
        userId: user.userId,
        sessionId: sessionId,
        micOn,
        videoOn,
      });

      participants.forEach((participant) => addParticipant(participant));
      addSessionId(sessionId!);
      replace("LiveMeetScreen");
    } catch (error) {
      console.log("Error starting call: ", error);
    }
  };

  const renderParticipantText = () => {
    if (participants?.length === 0) {
      return "No one is in the call yet!";
    }

    const names = participants
      ?.slice(0, 2)
      ?.map((participant) => participant.name)
      .join(", ");

    const count =
      participants?.length > 2 ? ` and ${participants?.length - 2} others` : "";

    return `${names}${count} are in the call!`;
  };
  return (
    <View style={prepareStyles.container}>
      <SafeAreaView />
      <View style={prepareStyles.headerContainer}>
        <ChevronLeft size={RFValue(18)} color={Colors.text} />

        <EllipsisVertical size={RFValue(18)} color={Colors.text} />
      </View>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={prepareStyles.videoContainer}>
          <Text style={prepareStyles.meetingCode}>
            {addHyphens(sessionId!)}
          </Text>

          <View style={prepareStyles.camera}>
            {localStream && videoOn ? (
              <RTCView
                streamURL={localStream.toURL()}
                style={prepareStyles.localVideo}
                mirror={true}
                objectFit="cover"
              />
            ) : (
              <Image
                source={{ uri: user?.photo }}
                style={prepareStyles.image}
              />
            )}

            <View style={prepareStyles.toggleContainer}>
              <TouchableOpacity
                onPress={() => toggleLocal("mic")}
                style={prepareStyles.iconButton}
              >
                {micOn ? (
                  <Mic size={RFValue(12)} color={"#fff"} />
                ) : (
                  <MicOff size={RFValue(12)} color={"#fff"} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleLocal("video")}
                style={prepareStyles.iconButton}
              >
                {videoOn ? (
                  <Video size={RFValue(12)} color={"#fff"} />
                ) : (
                  <VideoOff size={RFValue(12)} color={"#fff"} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={prepareStyles.buttonContainer}>
            <MonitorIcon size={RFValue(14)} color={Colors.primary} />

            <Text style={prepareStyles.buttonText}>Share screen</Text>
          </TouchableOpacity>

          <Text style={prepareStyles.peopleText}>
            {renderParticipantText()}
          </Text>
        </View>

        <View style={prepareStyles.infoContainer}>
          <View style={prepareStyles.flexRowBetween}>
            <Info size={RFValue(14)} color={Colors.text} />
            <Text style={prepareStyles.joiningText}>Joining information</Text>
            <Share size={RFValue(14)} color={Colors.text} />
          </View>

          <View style={{ marginLeft: 38 }}>
            <Text style={prepareStyles.joiningText}>Meeting Link</Text>
            <Text
              style={[
                prepareStyles.peopleText,
                { textAlign: "left", color: "blue" },
              ]}
            >
              meet.xyz/com/{addHyphens(sessionId!)}
            </Text>
          </View>

          <View style={prepareStyles.flexRow}>
            <Shield size={RFValue(14)} color={Colors.text} />
            <Text style={prepareStyles.buttonText}>Encryption</Text>
          </View>
        </View>
      </ScrollView>

      <View style={prepareStyles.joinContainer}>
        <TouchableOpacity
          style={prepareStyles.joinButton}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Text style={prepareStyles.joinButtonText}>Join</Text>
        </TouchableOpacity>
        <Text style={{ color: "#888", fontSize: RFValue(12) }}>Joining as</Text>
        <Text style={prepareStyles.peopleText}>{user?.name}</Text>
      </View>
    </View>
  );
};

export default PrepareMeetScreen;
