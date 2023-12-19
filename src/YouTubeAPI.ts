import { google } from 'googleapis';

class YouTubeAPI {
    private apiKey: string;
    private youtube;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.youtube = google.youtube({
            version: 'v3',
            auth: this.apiKey
        });
    }

    async getChannelName(channelId: string): Promise<string | null> {
        try {
            const response = await this.youtube.channels.list({
                part: ['snippet'],
                id: [channelId]
            });

            const channels = response.data.items;
            if (channels && channels.length > 0) {
                return channels[0].snippet?.title || null;
            }
            return null;
        } catch (error) {
            console.error('Error fetching channel name:', error);
            return null;
        }
    }
}

export default YouTubeAPI;
