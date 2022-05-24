import BackButton from "../components/BackButton";

import CharacterAttributes from "../components/CharacterAttributes";
import CharacterName from "../components/CharacterName";
import CharacterControls from "../components/CharacterControls";

import { character, setCharacter, removeCharacter } from "../../Character";

import { createEffect } from "solid-js";

function CharacterSheet() {
    createEffect(() => {
        if (character.attributes.hp == 0)
            console.log("zgon");
    });

    return (
        <div class="center">
            <div class="row">
                <div class="col-auto my-auto">
                    <BackButton href="/" />
                </div>
                <div class="col-auto ms-auto">
                    <h1 class="display-6">Character Sheet</h1>
                </div>
                <div class="col-auto ms-auto my-auto">
                    <button type="button" class="btn btn-outline-danger" onClick={() => removeCharacter()}>
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            <br />
            <CharacterName />
            <CharacterAttributes />
            <br />
            <CharacterControls />
            <br />

		    <div>Hello, {character.name}!</div>
            <button type="button" class="btn btn-primary btn-lg" onClick={() => setCharacter('attributes', 'mp', character.attributes.mp + 1)}>Test</button>
        </div>
	);
}

export default CharacterSheet;
