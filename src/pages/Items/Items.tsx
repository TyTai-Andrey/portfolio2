import React, { FC, useCallback, useEffect } from 'react';
import styles from './Items.module.scss';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import Button from '@components/Button';
import Input from '@components/Input';
import { useModal } from '@utils/useModal';
import { CreateItemModal } from './components/CreateItemModal';
import { useStore, useStoreMap } from 'effector-react';
import {
  $items,
  Item,
  removeItem,
  resetStote,
  setSearch,
} from '@store/items/items';
import classNames from 'classnames';

export type ItemsProps = {};

const Items: FC<ItemsProps> = () => {
  const { search } = useStore($items);

  useEffect(() => {
    return () => {
      setSearch('');
    };
  }, []);

  const items = useStoreMap({
    store: $items,
    keys: ['search'],
    fn: ({ items, search }) => {
      const result = items.filter((i) =>
        i.text.trim().toLowerCase().includes(search.trim().toLocaleLowerCase()),
      );

      if (result.length) return result;
      if (items.length) return 'Не найдено';
      return 'Итемов нет';
    },
  });

  const { openModal } = useModal();

  const onCreate = useCallback(() => {
    openModal(CreateItemModal);
  }, []);

  const onResetStore = useCallback(() => {
    resetStote();
  }, []);

  const onClickDeleteHandler = (item: Item) => {
    removeItem(item);
  };

  return (
    <div className={styles.root}>
      <div className={styles.settings}>
        <div className={styles.buttons}>
          <Button variant='contained' size='small' onClick={onCreate}>
            Create
          </Button>
          <Button variant='contained' size='small' onClick={onResetStore}>
            ResetStore
          </Button>
        </div>

        <Input
          size='small'
          placeholder='search'
          name='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {Array.isArray(items) && (
        <div className={styles.title}>На нас можно нажать!!!</div>
      )}
      <List className={styles.list}>
        {Array.isArray(items)
          ? items.map((i) => (
              <ListItem key={i.id} className={styles.listItem}>
                <Link to={i.path} draggable={false} className={styles.link}>
                  {i.text}
                </Link>
                <i
                  className={classNames('fa fa-trash', styles.trash)}
                  aria-hidden='true'
                  onClick={() => onClickDeleteHandler(i)}
                />
              </ListItem>
            ))
          : items}
      </List>
    </div>
  );
};

export default Items;
