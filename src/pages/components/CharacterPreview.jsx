import { createSignal, createEffect } from "solid-js";
import { classes, attributes, resources } from "../../Data";
import { selectedClass, characterName } from '../../Character'

function CharacterPreview() {
    const [keys, setKeys] = createSignal([])
    const [values, setValues] = createSignal([])

    createEffect(() => {
        const keys_ = [];
        const values_ = [];

        const attributes_ = attributes[selectedClass()];

        let i = 0;
        for (var key in attributes_) {
            if (i > 0) {
                keys_.push(key);
                values_.push(attributes_[key]);
            }
            i++;
        }

        setKeys(keys_);
        setValues(values_);
    })

    return (
        <div>
            <h5>Preview:</h5>
            <figure class="list-group text-end">
                <blockquote class="blockquote">
                    <p>{characterName()}</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    {classes[selectedClass()].name}
                </figcaption>
            </figure>
            <ul class="list-group">
                <For each={values()} fallback={<div>Loading...</div>}>
                    {(item, index) => (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{resources[keys().at(index())].acronym}</strong>
                            {resources[keys().at(index())].name}
                            <span class="badge bg-primary rounded-pill">{item}</span>
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
}

export default CharacterPreview;
