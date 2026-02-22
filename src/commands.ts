import type { ChatUserstate } from "tmi.js";

// Configuration du concours
const participants = [
    "AnaFalena",
    "Paradox",
    "Hiloa",
    "YuYu",
    "Dekou",
    "Nuroflemme",
    "Texass77",
    "Aimee",
    "Ynke",
    "Djelfa",
]; // Tu peux modifier cette liste avec tes vrais participants

// État du concours de housing
let currentParticipant = "";
let isVotingOpen = false;
let votes: Map<string, number> = new Map(); // userId -> vote (1-5)
let allResults: Map<string, { votes: number[], average: number }> = new Map();

// Gestion des commandes du bot housing
export function handleMessage(userstate: ChatUserstate, message: string): string | null {
    const command = message.trim().toLowerCase();
    const username = userstate["display-name"] ?? userstate.username ?? "inconnu";
    const userId = userstate["user-id"] ?? username;

    // Commandes de modération (pour le streamer)
    if (userstate.mod || userstate.badges?.broadcaster) {
        if (command.startsWith("!start ")) {
            const participantName = command.substring(7).trim(); // enlève "!start "
            return startVoting(participantName);
        }

        if (command === "!stop") {
            return stopVoting();
        }

        if (command === "!results") {
            return getResults();
        }

        if (command === "!ranking") {
            return getRanking();
        }

        if (command === "!participants") {
            return showParticipants();
        }

        if (command === "!reset") {
            return resetAll();
        }
    }

    // Votes des viewers (1-5)
    if (isVotingOpen && /^[1-5]$/.test(command)) {
        const vote = parseInt(command);
        return castVote(userId, username, vote);
    }

    // Commandes d'info pour tous
    if (command === "!vote") {
        return getVotingInfo();
    }

    return null;
}

function startVoting(participantName: string): string {
    if (!participantName) return "❌ Usage: !start NomDuParticipant";

    // Recherche flexible du participant (insensible à la casse, peut être partiel)
    const participant = participants.find(p =>
        p.toLowerCase().includes(participantName.toLowerCase()) ||
        participantName.toLowerCase().includes(p.toLowerCase())
    );

    if (!participant) {
        return `❌ Participant "${participantName}" non trouvé. (!participants pour voir la liste)`;
    }

    currentParticipant = participant;
    isVotingOpen = true;
    votes.clear();
    return `🏠 Vote ouvert pour la maison de ${participant} ! Tapez 1, 2, 3, 4 ou 5 pour voter !`;
}

function stopVoting(): string {
    if (!isVotingOpen) return "❌ Aucun vote en cours.";

    isVotingOpen = false;
    const totalVotes = votes.size;

    // Sauvegarder les résultats
    if (totalVotes > 0) {
        const voteArray = Array.from(votes.values());
        const average = voteArray.reduce((sum, vote) => sum + vote, 0) / voteArray.length;
        allResults.set(currentParticipant, { votes: voteArray, average });
    }

    return `🛑 Vote fermé pour ${currentParticipant}. ${totalVotes} vote(s) reçu(s) ! (!results pour les détails)`;
}

function castVote(userId: string, username: string, vote: number): string {
    if (!isVotingOpen) return "";

    const hadVoted = votes.has(userId);
    votes.set(userId, vote);

    if (hadVoted) {
        return `✅ @${username} a modifié son vote : ${vote}/5 pour ${currentParticipant}`;
    } else {
        return `✅ @${username} vote : ${vote}/5 pour ${currentParticipant}`;
    }
}

function getResults(): string {
    if (!isVotingOpen && !currentParticipant) return "❌ Aucun vote en cours ou récent.";

    const currentVotes = Array.from(votes.values());
    if (currentVotes.length === 0) return "❌ Aucun vote enregistré.";

    const average = currentVotes.reduce((sum, vote) => sum + vote, 0) / currentVotes.length;
    const distribution = [1, 2, 3, 4, 5].map(n =>
        `${n}⭐: ${currentVotes.filter(v => v === n).length}`
    ).join(" | ");

    return `📊 ${currentParticipant.toUpperCase()} - Moyenne: ${average.toFixed(1)}/5 (${currentVotes.length} votes) | ${distribution}`;
}

function getRanking(): string {
    if (allResults.size === 0) return "❌ Aucun résultat enregistré.";

    const ranking = Array.from(allResults.entries())
        .map(([name, data]) => ({ name, average: data.average, voteCount: data.votes.length }))
        .sort((a, b) => b.average - a.average)
        .map((entry, index) => `${index + 1}. ${entry.name}: ${entry.average.toFixed(1)}/5 (${entry.voteCount} votes)`)
        .join(" | ");

    return `🏆 CLASSEMENT HOUSING: ${ranking}`;
}

function showParticipants(): string {
    return `👥 Participants: ${participants.join(", ")}`;
}

function resetAll(): string {
    votes.clear();
    allResults.clear();
    currentParticipant = "";
    isVotingOpen = false;
    return "🔄 Système de vote complètement réinitialisé !";
}

function getVotingInfo(): string {
    if (isVotingOpen) {
        return `🏠 Vote en cours pour ${currentParticipant} ! Tapez 1, 2, 3, 4 ou 5 pour voter !`;
    } else if (currentParticipant) {
        return `💤 Vote fermé pour ${currentParticipant}. Attendez le prochain participant !`;
    } else {
        return "💤 Aucun vote en cours. Attendez le premier participant !";
    }
}