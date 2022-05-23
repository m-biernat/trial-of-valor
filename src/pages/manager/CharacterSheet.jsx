import { character, setCharacter, removeCharacter } from "../../Character";

function CharacterSheet() {
    return (
        <div class="center">
            <div class="row">
                <div class="col-auto">
                    <h1 class="display-6">Character Sheet</h1>
                </div>
                <div class="col-auto ms-auto my-auto">
                    <button type="button" class="btn btn-outline-danger" onClick={() => removeCharacter()}>
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
		    <div>Hello, {character.name}!</div>
            <button type="button" class="btn btn-primary btn-lg" onClick={() => setCharacter('name', 'test')}>Test</button>
        </div>
	);
}

export default CharacterSheet;
