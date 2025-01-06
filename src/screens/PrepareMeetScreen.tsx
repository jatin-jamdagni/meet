import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useWS } from "@/service/api/WSProvider";
import { useLiveMeetStore } from "@/service/meetStore";
import { useUserStore } from "@/service/userStore";
import { mediaDevices, MediaStream } from "react-native-webrtc";
import { requestPermissions } from "@/utils/Helpers";
const PrepareMeetScreen = () => {
  const { emit, on, off } = useWS();
  const { addParticipant, sessionId, addSessionId, toogle, micOn, videoOn } =
    useLiveMeetStore();
  const { user } = useUserStore();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    const handleParticipantUpdate = (updatedParticipants: any) => {
      setParticipants(updatedParticipants);
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

  const toogleMicState = (newState:any)=>{
    if(localStream){
     const audioTrack = localStream.getAudioTracks()[0];

     if(audioTrack){
      audioTrack.enabled = newState;
     }
    }
  }

  const toogleVideoState = (newState:any)=>{
    if(localStream){
     const videoTrack = localStream.getVideoTracks()[0];

     if(videoTrack){
      videoTrack.enabled = newState;
     }
    }
  }
  const fetchMediaPermissions = async () => {
    const result = await requestPermissions();
    if (result.isCameraGranted) {
      toogle("video");
    }
    if (result.isMicrophoneGranted) {
      toogle("mic");
    }


    showMediaDevices(result.isMicrophoneGranted, result.isCameraGranted);
  };

  useEffect(() => {
    fetchMediaPermissions();
  }, []);

  return (
    <View>
      <Text>PrepareMeetScreen</Text>
    </View>
  );
};

export default PrepareMeetScreen;
