import { createEffect, Match, Switch } from "solid-js";
import { game, loadGame, saveGame, deleteGame} from "../Game";

import BackButton from "./components/BackButton";
import { ModalAccept } from "./components/Modals";

import GameSetup from "./master/GameSetup";
import TurnOrder from "./master/TurnOrder";
import TokenPlacement from "./master/TokenPlacement";
import MainView from "./master/MainView";

function Master() {
    loadGame();
	createEffect(() => saveGame());

    function onDelete() {
        deleteGame();
        window.location.reload();
    }

	return (
		<div class="container py-4 center a4">
			<div class="row">
                <div class="col-auto my-auto">
                    <BackButton href="/" />
                </div>
                <div class="col text-center">
                    <h1 class="display-6">Game Master</h1>
                </div>
				<div class="col-auto my-auto">
					<button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete-game">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            <br />
            <Switch fallback={<MainView />}>
                <Match when={game.stage == 1}>
                    <h4 class="text-center text-muted mb-3">Step 1. Setup</h4>
                    <GameSetup />
                </Match>
                <Match when={game.stage == 2}>
                    <h4 class="text-center text-muted mb-3">Step 2. Player turn order</h4>
                    <TurnOrder />
                </Match>
                <Match when={game.stage == 3}>
                    <h4 class="text-center text-muted mb-3">Step 3. Token placement</h4>
                    <TokenPlacement />
                </Match>
            </Switch>
            <ModalAccept id="delete-game" title="Delete game" action={() => onDelete()} body={
                <div class="text-center">
                    <h5>Do you really want to <strong>delete</strong> your game?</h5>
                </div>
            } />    
		</div>
	);
}

export default Master;