// Validation simple et directe des variables d'environnement
function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        console.error(`❌ Variable manquante : ${name}`);
        process.exit(1);
    }
    return value;
}

export const config = {
    BOT_USERNAME: getEnvVar("BOT_USERNAME"),
    BOT_OAUTH_TOKEN: getEnvVar("BOT_OAUTH_TOKEN"),
    CHANNEL: getEnvVar("CHANNEL"),
};