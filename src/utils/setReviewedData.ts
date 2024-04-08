import {ReduxHelper} from '../redux';
import {Reviewed} from '../rules/types.ts';

type Key = 'reviewedParts' | 'reviewedBooks';

export default function (
  id: string,
  key: Key,
  value: number,
  pastState: Reviewed,
) {
  const obj: {[key: string]: number} = {};
  obj[id] = value;
  if (!pastState) {
    ReduxHelper.setIn([key], obj);
  } else {
    ReduxHelper.setIn([key], {
      ...pastState,
      ...obj,
    });
  }
}
