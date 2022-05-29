import { enemies, placements, tokens } from "../../Data";

import { AccordionEmpty, AccordionHeader, AccordionItem } from "./Accordion";
import { ModalOk, ModalNext, ModalAccept, getModal } from "./Modals";

import { createSignal, Show } from "solid-js";
import { roll, parseHTML } from "../../Utils";
import { game, addEnemy, removeEnemy } from "../../Game";

export function EnemyList() {
    const firstKey = Object.keys(enemies)[0];
    
    const [active, setActive] = createSignal({id: firstKey, index: 0});
    const [value, setValue] = createSignal(firstKey);

    function placement(id) {
        return placements[enemies[id].placement];
    }

    function token(id) {
        return tokens[placement(id).token];
    }

    function onAdd() {
        addEnemy(value());
        getModal('enemy-place-token').show();
    }

    return (
        <>
            <div class="accordion" id="enemy-list">
                <AccordionHeader title="Enemies" symbol="bi bi-geo-alt ms-1" target="#add-new-enemy" />
                <Show when={game.enemies.length > 0} fallback={<AccordionEmpty name="enemie" />}>
                    <For each={game.enemies} fallback={<div>Loading...</div>}>
                        {(item, index) => (
                            <AccordionItem 
                                parent="#enemy-list" 
                                id={`enemy-${index()}`} 
                                index={<strong>{placement(item).values[game.placement]}</strong>} 
                                title={<Label id={item} name={token(item).name} />}
                                description={parseHTML(enemies[item].description)}
                                behaviour={<Details id={item} />}
                                buttons={<ButtonsAttackDefenceRemove />}
                                onClick={() => setActive({id: item, index: index()})}
                            />
                        )}
                    </For>
                </Show>
            </div>
            <ModalAccept 
                id="add-new-enemy" 
                title="Add new enemy" 
                action={() => onAdd()}
                body={
                    <select class="form-select" value={value()} onChange={(event) => setValue(event.target.value)}>
                        <For each={Object.keys(enemies)} fallback={<div>Loading...</div>}>
                            {(item) => (
                                <option value={item}>({item}) {token(item).name}</option>
                            )}
                        </For>
                    </select>
            }/>

            <ModalOk id="enemy-place-token" title="Place token" body={
                <div>
                    <p class="text-center">Place token on board:</p>
                    <Label id={placement(active().id).token} name={token(active().id).name} />
                </div>
            }/>

            <ModalAttackDefenceRemove id={active().id} name={token(active().id).name} index={active().index} />
        </>
    );
}

function Label(props) {
    return(
        <div class="text-center">
            <span class="badge rounded-pill bg-secondary me-1">{props.id}</span>
            {props.name}
        </div>
    );
}

function Details(props) {
    return(
        <div class="my-2">
            <strong>AP</strong>: {enemies[props.id].ap}
            <strong class="ms-3">DP</strong>: {enemies[props.id].dp}
        </div>
    );
}

export function ModalAttackDefenceRemove(props) {
    const [rollValue, setRollValue] = createSignal(0);

    function rollDice() {
        let value = roll(1, 6);
        if (value == rollValue()) {
            if (value < 6)  value++;
            else            value--;
        }
        setRollValue(value);
    }

    return (
        <>
            <ModalNext id="enemy-attack" title={`Roll ${props.name}'s attack`} target="#enemy-attack-result" action={rollDice} body={
                <div>
                    <p class="text-center">Proceed to roll attack for:</p>
                    <Label id={props.id} name={props.name} />
                </div>
            }/>
            <ModalOk id="enemy-attack-result" title={`${props.name}'s attack value`} body={
                <div class="row">
                    <h1 class="col-auto ms-auto me-1">
                        <i class={`bi bi-dice-${rollValue()}`}></i>
                    </h1>
                    <h1 class="col-auto">+</h1>
                    <h1 class="col-auto">{enemies[props.id].ap}</h1>
                    <h1 class="col-auto">=</h1>
                    <h1 class="col-auto ms-2 me-auto">
                        <strong>{enemies[props.id].ap + rollValue()}</strong>
                    </h1>
                </div>
            }/>

            <ModalNext id="enemy-defence" title={`Roll ${props.name}'s defence`} target="#enemy-defence-result" action={rollDice} body={
                <div>
                    <p class="text-center">Proceed to roll defence for:</p>
                    <Label id={props.id} name={props.name} />
                </div>
            }/>
            <ModalAccept id="enemy-defence-result" title={`${props.name}'s defence value`} action={() => removeEnemy(props.index)} body={
                <div>
                    <div class="row">
                        <h1 class="col-auto ms-auto me-1">
                            <i class={`bi bi-dice-${rollValue()}`}></i>
                        </h1>
                        <h1 class="col-auto">+</h1>
                        <h1 class="col-auto">{enemies[props.id].dp}</h1>
                        <h1 class="col-auto">=</h1>
                        <h1 class="col-auto ms-2 me-auto">
                            <strong>{enemies[props.id].dp + rollValue()}</strong>
                        </h1>
                    </div>
                    <div class="row">
                        <h5 class="col-auto ms-auto me-auto pt-2">Is your attack higher?</h5>
                    </div>
                </div>
            }/>

            <ModalAccept id="enemy-remove" title="Remove enemy" action={() => removeEnemy(props.index)} body={
                <div>
                    <p class="text-center">Do you really want to remove:</p>
                    <Label id={props.id} name={props.name} />
                </div>
            }/>
        </>
    );
}

export function ButtonsAttackDefenceRemove() {
    return (
        <div class="row">
            <div class="col-auto ms-auto me-auto">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#enemy-attack"><i class="bi bi-dice-5"></i> Attack</button>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#enemy-defence"><i class="bi bi-dice-5"></i> Defence</button>
                </div>
                    <button type="button" class="btn btn-outline-danger ms-2" data-bs-toggle="modal" data-bs-target="#enemy-remove"><i class="bi bi-trash3"></i></button>
            </div>
        </div>
    );
}
