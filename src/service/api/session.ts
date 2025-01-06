import { Alert } from "react-native"
import axios from 'axios'
import { BASE_URL } from "../config"

export const createSession = async () => {
     try {
        const response = await axios.post(`${BASE_URL}/create-session`);
        return response?.data?.sessionId
    } catch (error) {
        console.log("SESSION CREATE ERROR: ", error)
        Alert.alert("There was an error")
        return null
    }
}


export const checkSession = async (id: string) => {

    try {

        const response = await axios.get(`${BASE_URL}/is-alive?sessionId=${id}`);
        return response?.data?.isAlive

    } catch (error) {
        console.log("SESSION GET ERROR: ", error)
        return false
    }
}