import { ItemList, ButtonsCompleteAbandon, ModalCompleteAbandon, IndexComplete } from "./ItemManagement";

function QuestLog() {
    return (
        <ItemList 
            name="quest" 
            title="Quest Log" 
            categoryName="quests" 
            button={ButtonsCompleteAbandon} 
            modal={ModalCompleteAbandon} 
            symbol="bi bi-list-check" 
            index={IndexComplete} 
            stackable={false}
        />
    );
}

export default QuestLog;
