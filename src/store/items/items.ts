// Core
import { createEvent, createStore } from 'effector';
import { createBrowserHistory } from 'history';
import { initItems } from '@store/items/utils';

export const history = createBrowserHistory();

export type Items = typeof initItems;
export type Item = Items[0];
type ItemsStore = {
  search: string;
  items: Items;
};

const itemsLocalStorage = localStorage.getItem('items');
const items: Items = itemsLocalStorage ? JSON.parse(itemsLocalStorage) : [];

export const $items = createStore<ItemsStore>({
  search: '',
  items: !items.length && !itemsLocalStorage ? initItems : items,
});
export const setItems = createEvent<Items>();
export const addItems = createEvent<Item | Items>();
export const removeItem = createEvent<Item>();
export const setSearch = createEvent<string | undefined>();
export const resetStote = createEvent<string | undefined>();

$items.on(setItems, (s, items) => {
  localStorage.setItem('items', JSON.stringify(items));
  return { ...s, items };
});

$items.on(addItems, (s, items) => {
  const newItems = Array.isArray(items)
    ? [...s.items, ...items]
    : [...s.items, items];
  localStorage.setItem('items', JSON.stringify(newItems));

  return { ...s, items: newItems };
});

$items.on(removeItem, (s, item) => {
  const newItems = s.items.filter((i) => i.id !== item.id);
  localStorage.setItem('items', JSON.stringify(newItems));
  return { ...s, items: newItems };
});

$items.on(setSearch, (s, search) => {
  return { ...s, search: search || '' };
});

$items.on(resetStote, () => {
  localStorage.removeItem('items');
  return { search: '', items: initItems };
});
