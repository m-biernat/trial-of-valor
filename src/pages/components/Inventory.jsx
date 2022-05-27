import { ItemList,  ButtonsAddRemoveDelete, ModalAddRemoveDelete, IndexQuantity} from "./ItemManagement";

function Inventory() {
    return(
        <ItemList 
            name="item" 
            title="Inventory" 
            categoryName="items" 
            button={ButtonsAddRemoveDelete} 
            modal={ModalAddRemoveDelete} 
            symbol="bi bi-box-seam" 
            index={IndexQuantity}
            stackable={true}
        />
    );
}

export default Inventory;
