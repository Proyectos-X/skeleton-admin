import storage from 'redux-persist/lib/storage';
import type { PersistConfig } from 'redux-persist';
import type { rootReducer } from './root-reducer';

type RootState = ReturnType<typeof rootReducer>;

export const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // reducers que deseas persistir
};
