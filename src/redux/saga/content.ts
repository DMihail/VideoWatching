import {getRemoteValue} from '../../utils/removeConfig.ts';
import {ReduxHelper} from '../index.ts';

export function* getContent(): any {
  try {
    const content = yield getRemoteValue('content');
    if (content) {
      ReduxHelper.setIn(['content'], content.data);
    }
  } catch (e) {
    if (__DEV__) {
      console.log(e);
    }
  }
}

export function* getCurrentBook(id: string): any {
  const content = yield getRemoteValue(id);
  if (content) {
    return content.data;
  } else {
    throw new Error('Content is empty');
  }
}
