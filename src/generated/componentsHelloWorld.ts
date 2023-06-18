import type { FileDetails } from '@/types/lib';
const fileDetails: FileDetails = {
  name: 'HelloWorld',
  file: 'Component',
  description: 'dsdfsfds description',
  prop: [
    { type: 'string', name: 'title', defaultValue: "'My product'", description: 'component title' },
    { type: 'string', name: 'name', description: "product's name" },
    { type: 'string', name: 'startSale', defaultValue: 'undefined', description: "start date of the product's sale" },
    { type: 'number', name: 'stores', description: 'number of stores where the product is sold' },
  ],
  data: [
    { type: 'Date', name: 'today', defaultValue: 'new Date()', description: "today's date" },
    { type: 'number', name: 'quantity', defaultValue: '1', description: 'quantity of items to buy' },
  ],
  computed: [{ type: 'number', name: 'daysToSale', description: 'days remaining until the sale starts' }],
  emit: [
    {
      params: [{ name: 'quantity', type: 'number' }],
      name: 'onBuy',
      description: 'emitted when the buy button is clicked, emits the quantity of items to buy',
    },
  ],
  method: [
    {
      type: 'void',
      params: [{ name: 'add', type: 'boolean' }],
      name: 'changeQuantity',
      description:
        'changes the quantity of items to buy depending on the value of the add parameter. If add is true, the quantity is increased by 1, otherwise it is decreased by 1.',
    },
  ],
};
export default fileDetails;
