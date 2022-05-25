import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store'
import { attributes, categories, presets } from './Data';
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
        attributes: Object.assign({}, attributes[selectedClass()]),
        effects: [],
        items: [],
        quests: []
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
    setCharacter('attributes', name, v => v + value);
}

function getIndex(id, table) {
    return character[table].findIndex(el => el.id === id);
}

export function addNew(id, table) {
    const ind = getIndex(id, table);

    if (ind >= 0)
        modify(ind, table, 1);
    else {
        setCharacter(table, arr => [...arr, {
            id: id,
            quantity: 1
        }]);
        execute(id, table, 'onAdd');
    }
}

export function modify(index, table, value) {
    setCharacter(table, index, 'quantity', v => v + value);

    if (character[table][index].quantity <= 0)
        remove(index, table);
    else {
        const action = value > 0 ? 'onAdd' : 'onRemove';
        execute(character[table][index].id, table, action);
    } 
} 

export function remove(index, table) {
    const entity = character[table][index];
    
    for (let i=0; i<entity.quantity; i++)
        execute(character[table][index].id, table, 'onRemove');

    setCharacter(table, arr => arr.filter(item => item.id !== entity.id));
}

export function mark(index, table) {
    setCharacter(table, index, 'quantity', v => v - 1);
    execute(character[table][index].id, table, 'onMark');
}

const remote = {
    "modAttr": modifyAttribute
} 

function execute(id, table, action) {
    const executable = categories[table][id][action];

    if (executable) {
        for (const exec of executable) {
            remote[exec[0]](exec[1], exec[2], exec[3], exec[4], exec[5]);
        }
    }
}
