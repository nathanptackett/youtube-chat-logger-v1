import YouTubeAPI from './YouTubeAPI';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import 'dotenv/config';

async function main() {
    const argv = await yargs(hideBin(process.argv))
        .option('broadcast_id', {
            alias: 'b',
            describe: 'The broadcast ID',
            type: 'string'
        })
        .option('h', {
            alias: 'help',
            describe: 'Print help',
            type: 'boolean'
        })
        .argv;

    if (argv.help) {
        yargs.showHelp();
        return;
    }

    if (!argv.broadcast_id) {
        console.log('Please provide a broadcast ID to operate on via -b,--broadcast-id <broadcast id>')
        return;
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        throw new Error("YouTube API key is not set in .env file.");
    }

    const youtube = new YouTubeAPI(apiKey);
    const videoInfo = await youtube.getVideoInfo(argv.broadcast_id)
    if(!videoInfo) {
        console.error("Failed to access video with id of ", argv.broadcast_id)
        return
    }

    const title = videoInfo.title;
    const channelName = videoInfo.channelTitle;
    const isLiveBroadcast = videoInfo.liveBroadcastContent == 'live' || videoInfo.liveBroadcastContent == 'upcoming';
    console.log(videoInfo.liveBroadcastContent)

    console.log("Succesfully opened video \"" + title + "\" by \"" + channelName + "\"")
    if(!isLiveBroadcast) {
        console.error("Error: This application only operates on live videos")
        return
    }

    // TODO - Add chat logging
    console.log("Logging chat from video \"" + title + "\"");
}

main();
