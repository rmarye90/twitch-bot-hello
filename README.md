# Bot Twitch - Concours Housing WoW 🏠

Bot Twitch pour organiser des concours de housing World of Warcraft avec votes des viewers par nom de participant.

## 🚀 Démarrage rapide

1. Copiez `.env.example` vers `.env`
2. Configurez vos variables d'environnement
3. Modifiez la liste des participants dans `src/commands.ts`
4. `npm run dev` pour démarrer le bot

## 🏠 Commandes du bot

### Pour le streamer/modérateurs :
- `!start Jaina` - Démarre le vote pour le participant (recherche flexible)
- `!stop` - Ferme le vote en cours et sauvegarde les résultats
- `!results` - Affiche les résultats détaillés du vote actuel
- `!ranking` - Affiche le classement de tous les participants
- `!participants` - Affiche la liste des participants
- `!reset` - Remet à zéro tout le système

### Pour les viewers :
- `1`, `2`, `3`, `4`, `5` - Vote de 1 à 5 étoiles (quand un vote est ouvert)
- `!vote` - Voir l'état actuel du vote

## 👥 Configuration des participants

Modifiez la liste dans `src/commands.ts` ligne 4-12 :
```typescript
const participants = [
    "Alexstrasza",
    "Tyrande", 
    "Jaina",
    "Sylvanas",
    "VotreParticipant1",
    "VotreParticipant2"
    // ... ajoutez vos participants
];
```

## 📊 Exemple d'utilisation

```
Streamer: !participants
Bot: 👥 Participants: Alexstrasza, Tyrande, Jaina, Sylvanas, Valeera, Thrall, Arthas, Illidan

Streamer: !start jaina
Bot: 🏠 Vote ouvert pour la maison de Jaina ! Tapez 1, 2, 3, 4 ou 5 pour voter !

Viewer1: 4
Bot: ✅ @Viewer1 vote : 4/5 pour Jaina

Viewer2: 5
Bot: ✅ @Viewer2 vote : 5/5 pour Jaina

Streamer: !stop
Bot: 🛑 Vote fermé pour Jaina. 2 vote(s) reçu(s) ! (!results pour les détails)

Streamer: !results
Bot: 📊 JAINA - Moyenne: 4.5/5 (2 votes) | 1⭐: 0 | 2⭐: 0 | 3⭐: 0 | 4⭐: 1 | 5⭐: 1

Streamer: !start alex
Bot: 🏠 Vote ouvert pour la maison de Alexstrasza ! Tapez 1, 2, 3, 4 ou 5 pour voter !

Streamer: !ranking
Bot: 🏆 CLASSEMENT HOUSING: 1. Jaina: 4.5/5 (2 votes) | 2. Alexstrasza: 4.0/5 (1 votes)
```

## ⚡ Fonctionnalités

- ✅ **Recherche flexible** des participants (insensible à la casse, partielle)
- ✅ **Vote simple** (1-5) avec un vote par viewer
- ✅ **Sauvegarde automatique** des résultats après chaque vote
- ✅ **Classement général** de tous les participants
- ✅ **Interface intuitive** avec noms des participants
- ✅ **Modification de vote** possible pendant le vote ouvert
