import * as tmi from "tmi.js";
import { config } from "./config.ts";
import { handleMessage } from "./commands.ts";

// Démarrage simple du bot Twitch
export async function startBot(): Promise<void> {
    const client = new tmi.Client({
        identity: {
            username: config.BOT_USERNAME,
            password: config.BOT_OAUTH_TOKEN,
        },
        channels: [config.CHANNEL],
    });

    await client.connect();
    console.log(`✅ Bot connecté sur #${config.CHANNEL}`);

    client.on("message", (_channel, userstate, message, self) => {
        if (self) return;

        const response = handleMessage(userstate, message);
        if (response) client.say(config.CHANNEL, response);
    });
}