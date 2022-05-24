import { resources } from "../../Data";
import { character } from "../../Character";

function CharacterAttributes() {
	const keys = [];
	
	let i = 0;
	for (const key in character.attributes) {
		if (i > 0)
			keys.push(key);
		i++;
	}

	return (
		<div>
			<ul class="list-group">
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<strong>{resources['mp'].acronym}</strong>
					{resources['mp'].name}
					<span class="badge bg-danger rounded-pill">{character.attributes.mp}</span>
				</li>
			</ul>

            <ul class="list-group py-2">
                <For each={keys} fallback={<div>Loading...</div>}>
                    {(item) => (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{resources[item].acronym}</strong>
                            {resources[item].name}
                            <span class="badge bg-primary rounded-pill">{character.attributes[item]}</span>
                        </li>
                    )}
                </For>
            </ul>
        </div>
	);
}

export default CharacterAttributes;
