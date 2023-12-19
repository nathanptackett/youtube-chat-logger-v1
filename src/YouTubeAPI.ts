import { youtube_v3, google } from 'googleapis';

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

    async getVideoInfo(videoId: string): Promise<youtube_v3.Schema$VideoSnippet | null> {
        try {
            const response = await this.youtube.videos.list({
                part: ['snippet'],
                id: [videoId]
            });

            const videos = response.data.items;
            if (videos && videos.length > 0) {
                const snippet = videos[0].snippet;
                if(snippet)
                    return snippet
                return null
            }
            return null;
        } catch (error) {
            console.error('Error fetching video information:', error);
            return null;
        }
    }
}

export default YouTubeAPI;
