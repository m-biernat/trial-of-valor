import { For } from 'solid-js';
import { classes } from '../../Data'
import { selectedClass, selectClass } from '../../Character'

function ClassSelection() {
    const keys = new Array();
    const values = new Array();

    for (var key in classes) {
        keys.push(key);
        values.push(classes[key]);
    }

    selectClass(keys[0]);

    return (
        <div class="list-group list-group-checkable d-grid gap-2 border-0 w-auto">
            <h5>Select class:</h5>
            <For each={values} fallback={<div>Loading...</div>}>
                {(item, index) => (
                    <div>
                        <input class="list-group-item-check pe-none" type="radio" name="classSelection" id={`classSelection${index() + 1}`} value={keys[index()]} checked={keys[index()] === selectedClass()} onChange={() => selectClass(keys[index()])}/>
                        <label class="list-group-item rounded-3 py-3" for={`classSelection${index() + 1}`}>
                            {item.name}
                            <span class="d-block small opacity-50">{item.description}</span>
                        </label>
                    </div>
                )}
            </For>
        </div>
    );
}

export default ClassSelection;