import { createEffect } from 'solid-js';

import { character, loadCharacter, saveCharacter } from "../Character";

import CharacterCreator from "./manager/CharacterCreator";
import CharacterSheet from "./manager/CharacterSheet";

function Manager() {
	loadCharacter();
	createEffect(() => saveCharacter());
	return (
		<div class="container py-4">
			<Switch fallback={<div>Somethings wrong...</div>}>
				<Match when={character.name === undefined}>
					<CharacterCreator />
				</Match>
				<Match when={character.name !== undefined}>
					<CharacterSheet />
				</Match>
			</Switch>
		</div>
	);
}

export default Manager;
