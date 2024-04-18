import {ReduxHelper} from '../redux';
import {Reviewed} from '../rules/types.ts';
import {ReduxStoreStateTemplate} from 'obrigado-redux-utils';

type Key = 'reviewedParts' | 'reviewedBooks';

export default function (
  id: string,
  key: Key,
  value: number,
  pastState: {
    [p: string]: Reviewed[string] extends Array<infer W>
      ? Immutable.List<ReduxStoreStateTemplate<W>>
      : Reviewed[string] extends Record<string, any>
      ? ReduxStoreStateTemplate<Reviewed[string]>
      : Reviewed[string];
  } | null,
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
