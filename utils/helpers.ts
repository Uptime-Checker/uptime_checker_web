import { EffectCallback, useEffect } from 'react';

export const useEffectOnlyOnce = (func: EffectCallback) => useEffect(func, []);
