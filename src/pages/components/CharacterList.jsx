import { game, markAsDead } from "../../Game";
import { For, Show } from "solid-js";
import { classes } from "../../Data";

function CharacterList(props) {
    return (
        <ol class="list-group list-group-numbered">
            <For each={game.characters} fallback={
                <li class="list-group-item text-center">
                    <em>Character list is empty</em>
                </li>
            }>
            {(item, index) => (
                <li class={`list-group-item d-flex justify-content-between align-items-start ${game.turn == index() ? 'active' : ''}`}>
                    <div class={`ms-2 me-auto ${item.alive ? '' : 'text-muted'}`}>
                        <div class="fw-bold">{item.name}</div>
                        {classes[item.class].name}
                        
                    </div>
                    <Show when={props.showKillButton == true && item.alive}>
                        <button type="button" class="btn btn-outline-dark my-auto" onClick={() => markAsDead(index())}>
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </Show>
                </li>
            )}
            </For>
        </ol>
    );
}

export default CharacterList;
