import { type ReactNode } from 'react';
import { Provider, createStore } from 'jotai';
import { configAtom } from '..';
import { teamDataAtom, TeamReq } from '../../../atoms/teamAtoms';

interface Props {
  data: {
    config: any;
    teamDataAtom: TeamReq
  };
  children: ReactNode;
}

export default function Store({
  data: {
    config,
    teamDataAtom,
  },
  children,
}: Props) {
  const store = createStore();

  store.set(configAtom, config);
  store.set(configAtom, teamDataAtom);
  
  return <Provider store={store}>{children}</Provider>;
}
