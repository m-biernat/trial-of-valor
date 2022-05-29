import { game, markAsDead, markAsAlive, lastManStanding } from "../../Game";
import { createSignal, For, Match, Show, Switch } from "solid-js";
import { classes } from "../../Data";
import { ModalAccept } from "./Modals";

function CharacterList(props) {
    const [selected, select] = createSignal(0);

    return (
        <>
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
                    <Show when={props.showKillButton == true}>
                        <Switch>
                            <Match when={item.alive == true && !lastManStanding()}>
                                <button type="button" 
                                        class={`btn ${game.turn == index() ? 'btn-outline-light' : 'btn-outline-dark'} my-auto`} 
                                        data-bs-toggle="modal" data-bs-target="#mark-as-dead"
                                        onClick={() => select(index())}>
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </Match>
                            <Match when={item.alive == false}>
                                <button type="button" class="btn btn-outline-success my-auto" 
                                        data-bs-toggle="modal" data-bs-target="#mark-as-alive"
                                        onClick={() => select(index())}>
                                    <i class="bi bi-arrow-counterclockwise"></i>
                                </button>
                            </Match>
                        </Switch>
                    </Show>
                </li>
            )}
            </For>
        </ol>
        <ModalAccept 
            id="mark-as-dead" 
            title="Mark as dead"
            action={() => markAsDead(selected())} 
            body={
                <div class="text-center">
                    <h5>Do you want to mark <strong>{game.characters[selected()].name}</strong> as dead?</h5>
                </div>
        } />
        <ModalAccept 
            id="mark-as-alive" 
            title="Mark as alive"
            action={() => markAsAlive(selected())} 
            body={
                <div class="text-center">
                    <h5>Do you want to mark <strong>{game.characters[selected()].name}</strong> as alive?</h5>
                </div>
        } />
        </>
    );
}

export default CharacterList;
