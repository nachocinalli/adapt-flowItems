import Adapt from 'core/js/adapt';
import FlowItemsModel from './FlowItemsModel';
import FlowItemsView from './FlowItemsView';

export default Adapt.register('flowItems', {
  model: FlowItemsModel,
  view: FlowItemsView
});
