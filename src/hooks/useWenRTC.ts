import { useWS } from "@/service/api/WSProvider";
import { useLiveMeetStore } from "@/service/meetStore"
import { useUserStore } from "@/service/userStore"
import { peerConstraints } from "@/utils/Helpers";
import { useRef, useState } from "react";
import { mediaDevices, MediaStream, RTCPeerConnection } from "react-native-webrtc";


export const userWebRTC = () => {


    const {
        sessionId,
        addParticipant,
        removeParticipant,
        toggle,
        micOn,
        videoOn,
        addSessionId,
        removeSessionId,
        participants,
        setStreamUrl,
        updateParticipant
    } = useLiveMeetStore()


    const { user } = useUserStore();

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const { emit, on, off } = useWS();
    const peerConnections = useRef(new Map())

    const pendingCandidates = useRef(new Map())




    const startLocalStream = async () => {
        try {
            const MediaStream = await mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
        } catch (error) {

            console.log("Error in getting Media Devices: ", error);

        }

        const establishedPeerConnection = async () => {

            participants?.forEach(async (streamUser: any) => {
                if (!peerConnections.current.has(streamUser.userId)) {
                    const peerConnection = new RTCPeerConnection(peerConstraints);
                    peerConnections.current.set(streamUser.userId, peerConnection)

                }

            })
        }
    }





    return {
        localStream,
        participants,
        toggleMic,
        toogleVideo,
        SwitchCamera
    }
}