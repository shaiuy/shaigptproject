class AppConfig {
    public readonly isDevelopment = import.meta.env.DEV;
    public readonly isProduction = import.meta.env.PROD;
    public readonly chatUrl = import.meta.env?.VITE_CHAT_URL

}

export const appConfig = new AppConfig();