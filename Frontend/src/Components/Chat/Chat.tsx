import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { ChatRequestModel } from "../../Models/ChatRequestModel";
import { MessageModel } from "../../Models/MessageModel";
import { chatService } from "../../Services/ChatService";
import "./Chat.css";

// Main chat page component
export function Chat() {

    // Form handling for the message input
    const { register, handleSubmit, reset, setFocus } = useForm<ChatRequestModel>();

    // Chat state
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [conversationId, setConversationId] =
        useState(crypto.randomUUID());
    const [isLoading, setIsLoading] = useState(false);
    const [emptyMessageAlert, setEmptyMessageAlert] = useState(false);

    // Ref for auto-scrolling to the latest message
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { ref: messageRegisterRef, ...messageRegister } = register("message");

    // Scroll down when messages or loading state change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, isLoading]);

    // Auto-hide empty message alert after 4 seconds
    useEffect(() => {
        if (!emptyMessageAlert) return;

        const timer = window.setTimeout(() => {
            setEmptyMessageAlert(false);
        }, 4000);

        return () => window.clearTimeout(timer);
    }, [emptyMessageAlert]);

    // Show warning when user tries to send an empty message
    function showEmptyMessageAlert() {
        setEmptyMessageAlert(true);
    }

    // Send user message and get AI reply
    async function send(chatRequest: ChatRequestModel) {

        const message = chatRequest.message?.trim();

        // Block empty or whitespace-only messages
        if (!message) {
            showEmptyMessageAlert();
            return;
        }

        chatRequest.message = message;

        try {

            setIsLoading(true);
            chatRequest.conversation_id = conversationId;

            // Add user message to the chat
            const userMessage = new MessageModel();
            userMessage.role = "user";
            userMessage.content = chatRequest.message;

            setMessages(prev => [
                ...prev,
                userMessage
            ]);

            reset();

            // Call backend API
            const reply = await chatService.sendMessage(chatRequest);

            // Add assistant reply to the chat
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

            // Return focus to input after reply
            setTimeout(() => {
                setFocus("message");
            }, 0);
        }
    }

    // Clear chat and start a new conversation
    function newChat() {

        setMessages([]);

        setConversationId(
            crypto.randomUUID()
        );

        reset();

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

                    {/* Empty state */}
                    {messages.length === 0 && !isLoading && (
                        <div className="messages-empty">
                            <div className="messages-empty-icon">💬</div>
                            <p className="messages-empty-title">No messages yet</p>
                            <p className="messages-empty-hint">
                                Type a message below to start chatting with the AI assistant.
                            </p>
                        </div>
                    )}

                    {/* Message list */}
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

                    {/* Loading indicator */}
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

            {/* Empty message warning */}
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
                    ref={messageRegisterRef}
                    onKeyDown={(event) => {
                        // Enter sends, Shift+Enter adds a new line
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
