import { createSignal } from 'solid-js';
import { attributes } from './Data';

export const [selectedClass, selectClass] = createSignal('');
export const [characterName, setCharacterName] = createSignal('');

export let character = {}
export const characterList = []

export function addCharacter() {
    characterList.push(createCharacter());
}

export function setCharacter() {
    character = createCharacter();
    console.log(character);
}

function createCharacter() {
    return { 
        name: Object.assign(characterName()),
        attributes: Object.assign({}, attributes[selectedClass()])
    }
}