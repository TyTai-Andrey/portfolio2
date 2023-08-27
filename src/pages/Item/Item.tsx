import React, { FC, useMemo } from 'react';
import styles from './Item.module.scss';
import { RouteComponentProps } from 'react-router-dom';
import { $items } from '@store/items/items';
import { useStore } from 'effector-react';

export type ItemProps = RouteComponentProps<{ id: string }>;

const Item: FC<ItemProps> = (props) => {
  const { items } = useStore($items);
  const item = useMemo(() => {
    if (!props.match.params?.id) return undefined;

    return items.find((i) => String(i.id) === props.match.params?.id);
  }, []);
  return <div className={styles.root}>{item ? item.text : 'Не найдено'}</div>;
};

export default Item;
