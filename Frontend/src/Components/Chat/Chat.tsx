import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { ChatRequestModel } from "../../Models/ChatRequestModel";
import { MessageModel } from "../../Models/MessageModel";
import { chatService } from "../../Services/ChatService";
import "./Chat.css";

export function Chat() {

    const { register, handleSubmit, reset, setFocus } = useForm<ChatRequestModel>();

    const [messages, setMessages] = useState<MessageModel[]>([]);

    const [conversationId, setConversationId] =
        useState(crypto.randomUUID());

    const [isLoading, setIsLoading] = useState(false);
    const [emptyMessageAlert, setEmptyMessageAlert] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLTextAreaElement>(null);

    const { ref: messageRegisterRef, ...messageRegister } = register("message");

    const MAX_INPUT_HEIGHT = 120;

    function adjustTextareaHeight() {
        const textarea = messageInputRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        const nextHeight = Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT);
        textarea.style.height = `${nextHeight}px`;
        textarea.style.overflowY =
            textarea.scrollHeight > MAX_INPUT_HEIGHT ? "auto" : "hidden";
    }

    function resetTextareaHeight() {
        const textarea = messageInputRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.overflowY = "hidden";
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, isLoading]);

    useEffect(() => {
        if (!emptyMessageAlert) return;

        const timer = window.setTimeout(() => {
            setEmptyMessageAlert(false);
        }, 4000);

        return () => window.clearTimeout(timer);
    }, [emptyMessageAlert]);

    function showEmptyMessageAlert() {
        setEmptyMessageAlert(true);
    }

    async function send(chatRequest: ChatRequestModel) {

        const message = chatRequest.message?.trim();

        if (!message) {
            showEmptyMessageAlert();
            return;
        }

        chatRequest.message = message;

        try {

            setIsLoading(true);

            chatRequest.conversation_id = conversationId;

            const userMessage = new MessageModel();

            userMessage.role = "user";

            userMessage.content = chatRequest.message;

            setMessages(prev => [
                ...prev,
                userMessage
            ]);

            reset();
            resetTextareaHeight();

            const reply = await chatService.sendMessage(chatRequest);

            const assistantMessage = new MessageModel();

            assistantMessage.role = "assistant";

            assistantMessage.content = reply;

            setMessages(prev => [
                ...prev,
                assistantMessage
            ]);
        }
        catch (err: any) {
            console.log(err);
        }
        finally {
            setIsLoading(false);

            setTimeout(() => {
                setFocus("message");
            }, 0);
        }
    }

    function newChat() {

        setMessages([]);

        setConversationId(
            crypto.randomUUID()
        );

        reset();
        resetTextareaHeight();

        setTimeout(() => {
            setFocus("message");
        }, 0);
    }

    return (
        <div className="Chat">

            <header className="chat-header">
                <div className="chat-header-text">
                    <h1>Chat</h1>
                    <p className="chat-subtitle">
                        Powered by AI &mdash; start a new conversation anytime
                    </p>
                </div>

                <button
                    type="button"
                    className="new-chat-btn"
                    onClick={newChat}
                >
                    <span className="new-chat-icon">+</span>
                    New Chat
                </button>
            </header>

            <div className="messages-card">
                <div className="chat-toolbar">
                    <span className="chat-toolbar-label">Conversation</span>
                </div>

                <div className="messages">

                    {messages.length === 0 && !isLoading && (
                        <div className="messages-empty">
                            <div className="messages-empty-icon">💬</div>
                            <p className="messages-empty-title">No messages yet</p>
                            <p className="messages-empty-hint">
                                Type a message below to start chatting with the AI assistant.
                            </p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={
                                message.role === "user"
                                    ? "message user"
                                    : "message assistant"
                            }
                        >
                            <div className="message-bubble">
                                {message.content}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="typing">
                            <div className="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef}></div>

                </div>
            </div>

            {emptyMessageAlert && (
                <div className="chat-alert" role="alert">
                    <p>
                        Oops, it seems you tried to write a message. Try again.
                    </p>
                    <button
                        type="button"
                        className="chat-alert-close"
                        onClick={() => setEmptyMessageAlert(false)}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
            )}

            <form
                className="chat-form"
                onSubmit={handleSubmit(send)}
            >

                <textarea
                    className="chat-input"
                    {...messageRegister}
                    ref={(element) => {
                        messageRegisterRef(element);
                        messageInputRef.current = element;
                    }}
                    onInput={adjustTextareaHeight}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            void handleSubmit(send)();
                        }
                    }}
                    disabled={isLoading}
                    placeholder="Type a message..."
                    autoFocus
                    rows={1}
                />

                <button
                    className="send-btn"
                    disabled={isLoading}
                >
                    Send
                </button>

            </form>

        </div>
    );
}