import { createStore } from 'solid-js/store'
import { enemies, placements, setup } from './Data';
import { roll } from './Utils';

export const [checked, setChecked] = createStore(uncheck());
export const [game, setGame] = createStore(null);

export function createGame() {
    setGame(newGame());
}

function newGame() {
    return { 
        characters: [],
        deathCount: 0,
        stage: 1,
        turn: 0,
        round: 1, 
        maxRounds: 30,
        placement: getPlacement(),
        enemies: []
    }
}

export function saveGame() {
    localStorage.setItem('game', JSON.stringify(game));
}

export function loadGame() {
    const json = localStorage.getItem('game');
    if (json)
        setGame(JSON.parse(json));

    if (Object.keys(game).length === 0)
        createGame();
}

export function deleteGame() {
    localStorage.removeItem('game');
    createGame();
}

export function addCharacter(name, selectedClass) {
    setGame('characters', t => [...t, { name: name, class: selectedClass, alive: true }]);
}

export function removeCharacter(index) {
    const copy = [...game['characters']];
    copy.splice(index, 1);
    setGame('characters', copy);
}

export function nextStage() {
    setGame('stage', v => v + 1);
}

export function backStage() {
    setGame('stage', v => v - 1);
}

export function completeSetup() {
    const enemyPlacements = {};
    for (const enemy in enemies)
        enemyPlacements[enemies[enemy].placement] = enemy;

    for (const placement in setup) {
        const id = enemyPlacements[placement];
        if (id)
            addEnemy(id);
    }
    nextStage();
}

function getPlacement() {
    const id = Object.keys(placements)[0];
    const limit = placements[id].values.length - 1;

    let value = roll(0, limit);
    if (value == game.placement) {
        if (value < limit)  value++;
        else                value--;
    }

    return value;
}

export function newPlacement() {
    setChecked(uncheck());
    setGame('placement', getPlacement());
}

export function uncheck() {
    return new Array(Object.keys(placements).length).fill(false);
}

export function endTurn() {
    if (game.deathCount == game.characters.length)
        return;

    const nextTurn = game.turn + 1;

    if (nextTurn > game.characters.length - 1) {
        setGame('turn', 0);
        setGame('round', v => v + 1);
    } 
    else
        setGame('turn', v => v + 1);

    if (!game.characters[game.turn].alive)
        endTurn();
}

export function markAsDead(index) {
    setGame('characters', index, 'alive', false);
    setGame('deathCount', v => v + 1);
    
    if (game.turn == index)
        endTurn();
}

export function markAsAlive(index) {
    setGame('characters', index, 'alive', true);
    setGame('deathCount', v => v - 1);
}

export function lastManStanding() {
    return game.characters.length > 1 && 
           game.deathCount >= game.characters.length - 1;
}

export function addEnemy(id) {
    setGame('enemies', arr => [...arr, id]);
}

export function removeEnemy(index) {
    const copy = [...game.enemies];
    copy.splice(index, 1);
    setGame('enemies', copy);
}
