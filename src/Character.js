import { createSignal } from 'solid-js';
import { attributes, presets } from './Data';
import { roll } from './Utils';

export const [characterName, setCharacterName] = createSignal('');
export const [selectedClass, selectClass] = createSignal('');

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

export function rollPreset() {
    const preset = presets[roll(0, presets.length - 1)];
    setCharacterName(preset.name);
    selectClass(preset.class);
}
