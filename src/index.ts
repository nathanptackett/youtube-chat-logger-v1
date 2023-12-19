import YouTubeAPI from './YouTubeAPI'; // Adjust the path as needed
import 'dotenv/config';

async function main() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        throw new Error("YouTube API key is not set in .env file.");
    }

    const youtube = new YouTubeAPI(apiKey);
    const channelName = await youtube.getChannelName('UC_5niPa-d35gg88HaS7RrIw');
    console.log('Channel Name:', channelName);
}

main();
