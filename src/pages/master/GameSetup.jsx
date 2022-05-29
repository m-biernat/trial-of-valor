import { For, createSignal, Show } from "solid-js";
import { Link } from "solid-app-router";

import { classes } from '../../Data'

import { addCharacter, removeCharacter, game, deleteGame, nextStage, setGame } from "../../Game";
import { ModalOk, getModal } from "../components/Modals";

function GameSetup() {
    const [name, setName] = createSignal('');
    const [value, setValue] = createSignal('');

    setValue('war');

    function onAdd() {
        if (name().length > 0) {
            addCharacter(name(), value());
            setName('');
        }
        else
            getModal("no-name").show();
    }

    function onNext() {
        if (game.characters.length > 0)
            nextStage();
        else 
            getModal("empty-list").show();
    }

    return (
        <div class="center">
            <h5>Characters:</h5>
            <ul class="list-group">
                <For each={game.characters} fallback={
                    <li class="list-group-item text-center">
                        <em>Character list is empty</em>
                    </li>
                }>
                {(item, index) => (
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="me-auto">
                            <div class="fw-bold">{item.name}</div>
                            {classes[item.class].name}
                        </div>
                        <button type="button" class="btn btn-outline-danger my-auto" onClick={() => removeCharacter(index())}>
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </li>
                )}
                </For>
                
                <Show when={game.characters.length < 3}>
                    <li class="list-group-item">
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" id="characterNameInput" value={name()} onChange={e => setName(e.target.value)} />
                            <label for="characterNameInput">Character name</label>
                        </div>
                        <div class="row my-2">
                            <div class="col me-auto">
                                <select id="characterClassSelect" class="form-select d-flex" value={value()} onChange={(event) => setValue(event.target.value)}>
                                    <For each={Object.keys(classes)} fallback={<div>Loading...</div>}>
                                        {(item) => (
                                            <option value={item}>{classes[item].name}</option>
                                        )}
                                    </For>
                                </select>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-primary my-auto" onClick={() => onAdd()}>
                                    Add <i class="bi bi-plus-lg ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                </Show>
            </ul>

            <br />

            <div class="row">
                <h5 class="col my-auto">Round limit:</h5>
                <h4 class="col-auto my-auto"><span class="badge bg-secondary">{game.maxRounds}</span></h4>
            </div>
            <input type="range" class="form-range" min="5" max="100" step="5" id="round-limit" value={game.maxRounds} onChange={(event) => setGame('maxRounds', event.target.value)}></input>

            <div class="row justify-content-md-center py-4">
                <button type="button" class="btn btn-primary btn-lg col col-lg-3 mx-2" onClick={() => onNext()}>Next</button>
                <Link href="/" class="btn btn-outline-danger btn-lg col col-lg-3 mx-2" onClick={() => deleteGame()}>Cancel</Link>
            </div>

            <ModalOk id="no-name" title="Character name is empty" body={
                <div class="text-center">
                    <h5>Character name cannot be empty!</h5>
                </div>
            } />

            <ModalOk id="empty-list" title="Character list is empty" body={
                <div class="text-center">
                    <h5>In order to proceed <strong>add</strong> characters to the list!</h5>
                </div>
            } />
        </div>
    );
} 

export default GameSetup;
