import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mmkvStorage } from './storage'

 

interface UserStore {
    user: any | null;
    sessions: string[];
    setUser: (data: any) => void;
    addSession: (sessionId: string) => void;
    removeSession: (sessionId: string) => void;
    clear: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null, 
            sessions: [],
            setUser: (data: any) => set({ user: data }),
            addSession: (sessionId: string) => {
                const { sessions } = get();
                const existingSessionIndex = sessions.find(session => session === sessionId);
                if (existingSessionIndex === undefined) {
                    set({ sessions: [...sessions, sessionId] })
                }
            },
            removeSession: (sessionId: string) => {
                const { sessions } = get();
                const updatedSessions = sessions.filter(session => session !== sessionId);
                set({ sessions: updatedSessions });
            },
            clear: () => set({ user: null, sessions: [] })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => mmkvStorage),
        },
    ),
)
