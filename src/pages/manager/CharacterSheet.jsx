import BackButton from "../components/BackButton";

import CharacterAttributes from "../components/CharacterAttributes";
import CharacterName from "../components/CharacterName";
import CharacterControls from "../components/CharacterControls";
import { ItemList, ButtonARD, ModalARD, ButtonMAC, ModalMAC, IndexNumber, IndexMark } from "../components/ItemList";

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
            <ItemList name="effect" title="Effects" categoryName="effects" button={ButtonARD} modal={ModalARD} symbol="bi bi-hash" index={IndexNumber} />
            <br />
            <ItemList name="item" title="Inventory" categoryName="items" button={ButtonARD} modal={ModalARD} symbol="bi bi-hash" index={IndexNumber} />
            <br />
            <ItemList name="quest" title="Quest Log" categoryName="quests" button={ButtonMAC} modal={ModalMAC} symbol="bi bi-square" index={IndexMark} />
            <br />
        </div>
	);
}

export default CharacterSheet;
