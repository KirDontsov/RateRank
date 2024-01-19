import { $firmsGroups } from '@/api';
import { useList } from 'effector-react';

export const FirmsList = () => {
  return useList($firmsGroups, ({ firm_id, name }) => (
    <div key={firm_id}>
      {firm_id}
      <br />
      {name}
      <hr />
    </div>
  ));
};
