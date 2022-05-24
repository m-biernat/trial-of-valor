import { classes, attributes, resources } from "../../Data";
import { selectedClass, characterName } from "../../Character";

function CharacterPreview() {
    const keys = [];
	
	let i = 0;
	for (const key in attributes[selectedClass()]) {
		if (i > 0)
			keys.push(key);
		i++;
	}

    return (
        <div>
            <h5>Preview:</h5>
            <div class="text-center mb-3">
                <h4>{characterName()}</h4>
                <h6 class="text-muted">-{classes[selectedClass()].name}-</h6>
            </div>
            <ul class="list-group">
                <For each={keys} fallback={<div>Loading...</div>}>
                    {(item) => (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{resources[item].acronym}</strong>
                            {resources[item].name}
                            <span class="badge bg-primary rounded-pill">{attributes[selectedClass()][item]}</span>
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
}

export default CharacterPreview;
