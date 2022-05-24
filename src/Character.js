import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store'
import { attributes, presets } from './Data';
import { roll } from './Utils';

export const [characterName, setCharacterName] = createSignal('');
export const [selectedClass, selectClass] = createSignal('');

export const [character, setCharacter] = createStore(null);

export function createCharacter() {
    setCharacter(newCharacter());
}

function newCharacter() {
    return { 
        name: characterName(),
        class: selectedClass(),
        attributes: Object.assign({}, attributes[selectedClass()])
    }
}

export function saveCharacter() {
    localStorage.setItem('character', JSON.stringify(character));
}

export function loadCharacter() {
    const json = localStorage.getItem('character');
    if (json)
        setCharacter(JSON.parse(json));
}

export function removeCharacter() {
    localStorage.removeItem('character');
    window.location.reload();
}

export function rollPreset() {
    const preset = presets[roll(0, presets.length - 1)];
    setCharacterName(preset.name);
    selectClass(preset.class);
}

export function modifyAttribute(name, value) {
    setCharacter('attributes', name, character.attributes[name] + value);
}
