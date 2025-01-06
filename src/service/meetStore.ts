import { create } from 'zustand'

interface Participant {
    userId: string;
    micOn?: boolean;
    videoOn?: boolean;
    streamUrl?: string;
}

interface LiveMeetStore {
    sessionId: string | null;
    participants: Participant[];
    chatMessages: any[];
    micOn: boolean;
    videoOn: boolean;
    addSessionId: (id: string) => void;
    removeSessionId: () => void;
    addParticipant: (participant: Participant) => void;
    removeParticipant: (participant: Participant) => void;
    updateParticipant: (participant: Participant) => void;
    setStreamUrl: ({ participantId, streamUrl }: { participantId: string, streamUrl: string }) => void;
    toogle: (type: 'mic' | 'video') => void;
}

export const useLiveMeetStore = create<LiveMeetStore>((set, get) => ({
    sessionId: null,
    participants: [],
    chatMessages: [],
    micOn: false,
    videoOn: false,
    addSessionId: (id: string) => {
        set({ sessionId: id })
    },
    removeSessionId: () => {
        set({ sessionId: null })
    },
    addParticipant: (participant: Participant) => {
        const { participants } = get();
        const existingParticipant = participants.find(p => p.userId === participant?.userId);
        if (!existingParticipant) {
            set({ participants: [...participants, participant] });
        }
    },
    removeParticipant: (participant: Participant) => {
        const { participants } = get();
        const updatedParticipants = participants.filter(p => p.userId !== participant?.userId);
        set({ participants: updatedParticipants });
    },
    updateParticipant: (participant: Participant) => {
        const { participants } = get();
        const updatedParticipants = participants.map(p =>
            p.userId === participant?.userId ? {
                ...p,
                micOn: participant?.micOn,
                videoOn: participant?.videoOn
            } : p
        );
        set({ participants: updatedParticipants });
    },
    setStreamUrl: ({ participantId, streamUrl }: { participantId: string, streamUrl: string }) => {
        const { participants } = get();
        const updatedParticipants = participants.map(p =>
            p.userId === participantId ? {
                ...p,
                streamUrl
            } : p
        );
        set({ participants: updatedParticipants });
    },
    toogle: (type: 'mic' | 'video') => {
        if (type === 'mic') {
            set(state => ({ micOn: !state.micOn }))
        }
        else if (type === 'video') {
            set(state => ({ videoOn: !state.videoOn }))
        }
    }
}));
