import axios from "axios";
import { ChatRequestModel } from "../Models/ChatRequestModel";
import { appConfig } from "../Utils/AppConfig";

// Handles API calls to the backend chat endpoint
class ChatService {

    // Send message and return AI reply
    public async sendMessage(chatRequest: ChatRequestModel): Promise<string> {

        const response = await axios.post(
            appConfig.chatUrl,
            chatRequest
        );

        const reply = response.data.reply;

        return reply;
    }

}

export const chatService = new ChatService();
