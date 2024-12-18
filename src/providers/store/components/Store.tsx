import { type ReactNode } from 'react';
import { Provider, createStore } from 'jotai';
import { configAtom } from '..';


interface Props {
  data: {
    config: any;
  };
  children: ReactNode;
}

export default function Store({
  data: {
    config,
  },
  children,
}: Props) {
  const store = createStore();

  store.set(configAtom, config);
  
  return <Provider store={store}>{children}</Provider>;
}
