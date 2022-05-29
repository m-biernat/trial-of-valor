import { createStore } from 'solid-js/store'
import { placements } from './Data';
import { roll } from './Utils';

export const [checked, setChecked] = createStore(uncheck());
export const [game, setGame] = createStore(null);

export function createGame() {
    setGame(newGame());
}

function newGame() {
    return { 
        characters: [],
        stage: 1,
        turn: 0,
        round: 1, 
        maxRounds: 30,
        placement: getPlacement()
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
    const nextTurn = game.turn + 1;

    if (nextTurn > game.characters.length - 1) {
        setGame('turn', 0);
        setGame('round', v => v + 1);
    } else {
        setGame('turn', v => v + 1);
    }
}

export function markAsDead(index) {
    setGame('characters', index, 'alive', false);
    if (game.turn == index)
        endTurn();
}
