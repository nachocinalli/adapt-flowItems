import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class FlowItemsModel extends ItemsComponentModel {

  setActive(index) {
    const item = this.getItem(index);
    this.resetActiveItems();
    if (index === 0) {
      this.getChildren().each(item => item.toggleVisited(false));
    }
    this.setActiveItem(index);
    item.toggleVisited(true);
  }

}
