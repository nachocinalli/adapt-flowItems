import ComponentView from 'core/js/views/componentView';

class FlowItemsView extends ComponentView {
  className() {
    let classes = super.className();

    if (this.model.get('_isSequential')) {
      classes += ' is-sequential';
    }

    return classes;
  }

  preRender() {
    this.onClick = this.onClick.bind(this);
  }

  postRender () {
    this.$('.component__widget').imageready(() => {
      this.setReadyStatus();
    });
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion('.component__widget');
    }
    const items = this.model.getChildren();
    if (!items || !items.length) return;
    const activeItem = this.model.getActiveItem();
    if (!activeItem) {
      this.model.setActive(0);
    } else {
      items.trigger('change:_isActive', activeItem, true);
    }

  }

  onClick(event) {
    const activeIndex = this.model.getActiveItem().get('_index');
    const isAutoScroll = this.model.get('_isAutoScroll');
    if (activeIndex < this.model.getChildren().length - 1) {
      const activeNext = activeIndex + 1;
      this.model.setActive(activeNext);
      if (isAutoScroll) {
        this.scrollToItem(activeNext);
      }
    } else {
      this.model.setActive(0);
      if (isAutoScroll) {
        this.scrollToItem(0);
      }
    }
  }

  scrollToItem(index) {
    if (!this.model.get('_isSequential')) return;

    const navigationHeight = $('.nav').height();
    const $item = this.getItemElement(this.model.getItem(index));
    const settings = {
      duration: this.model.get('_scrollDuration'),
      offset: {
        top: -(navigationHeight + this.model.get('_scrollOffsetTop')),
        left: 0
      },
      axis: 'y'
    };

    $.scrollTo($item, settings);

  }

  getItemElement(item) {
    if (!item) return;
    const index = item.get('_index');
    return this.$('.flowitems__flow').filter(`[data-index="${index}"]`);
  }
}

FlowItemsView.template = 'flow-items.jsx';

export default FlowItemsView;
