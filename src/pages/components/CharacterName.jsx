import { classes } from "../../Data";
import { character } from "../../Character";

function CharacterName() {
	return (
        <div class="text-center mb-3">
            <h4>{character.name}</h4>
            <h6 class="text-muted">-{classes[character.class].name}-</h6>
        </div>
	);
}

export default CharacterName;
