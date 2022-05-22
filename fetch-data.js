import fetch from "node-fetch";
import { csv2json } from "csvjson-csv2json";
import * as fs from 'fs';

const master_doc_id = '1edsv2uq2X_RNW3SF9BV5dQMSwNiDbkhherQInA8tgu0';
const dir = './src/data/';
const delay = .25;

function getData(doc_id, sheet_id) {
    if (!doc_id) throw new Error('doc_id is required!');
    if (!sheet_id) throw new Error('sheet_id is required!');

    return fetch(`https://docs.google.com/spreadsheets/d/${doc_id}/export?format=csv&gid=${sheet_id}`)
        .then((r) => r.ok ? r.text() : null)
        .catch((_) => null)
}

function toJSON(csvData, hash, parseJSON = true, stringify = true) {
    if (!csvData)
        return null;

    const json = csv2json(csvData, {
        hash: hash,
        parseJSON: parseJSON,
    });

    if (stringify)
        return JSON.stringify(json);
    else
        return json;
}

function saveData(name, data) {
    if (!name) throw new Error('name is required!');
    if (!data) throw new Error('data is required!');

    fs.writeFile(`${dir + name}.json`, data, function (err) {
        if (err) return console.log(err);
        console.log('\x1b[32m%s\x1b[0m', `Saved ${name}.json`);
    });
}

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

console.log('Fetching master table...');

await sleep(delay);

const fetchMasterTable = await getData(master_doc_id, '0');
const masterTable = toJSON(fetchMasterTable, false, false, false);

if (!masterTable)
    throw new Error('Something\'s wrong with master table!');

console.log('\x1b[32m%s\x1b[0m', 'Loaded master table');

for (const table of masterTable) {
    await sleep(delay);

    console.log(`Fetching ${table.name}...`);

    const data = await getData(
        table.doc_id,
        table.sheet_id
    );

    const json = toJSON(
        data,
        table.hash === 'true',
        true
    );

    if (json)
        saveData(table.name, json);
}

await sleep(.05);

console.log('\x1b[1m%s\x1b[0m', 'Finished fetching data!');
