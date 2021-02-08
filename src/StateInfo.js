import React from 'react';
import cn from './classNames';

const formatContextObject = (function makeFormatContextObject() {
  const tabSeparatedObjects = ['T', 'T1', 'T2'];

  return function formatContextObject(obj, objKey) {
    const separator = tabSeparatedObjects.includes(objKey) ? '\t' : ' ';
    return Object.entries(obj)
      .map(([name, value]) => `${name}:${separator}${value}`)
      .join('\n');
  };
})();

const StateInfo = function StateInfo({ state }) {
  const { context } = state;
  const { T, T1, T2, stopwatch, ...rest } = context;
  const contextObjects = { T, T1, T2, stopwatch, rest };
  const contextInfoElements = Object.keys(contextObjects).map((key, i) => {
    const formattedObjectValues = formatContextObject(contextObjects[key], key);
    const text = [key, formattedObjectValues].join('\n');
    return (
      <div className={cn(`state-info-context-${key}`)} key={i}>
        {text}
      </div>
    );
  });

  return (
    <div className={cn('state-info')}>
      <div className={cn('state-info-section')}>
        <h3 className={cn('state-info-heading')}>Active states</h3>
        <div className={cn('state-info-states')}>
          {state.toStrings().join('\n')}
        </div>
      </div>
      <div className={cn('state-info-section')}>
        <h3 className={cn('state-info-heading')}>Extended state</h3>
        <div className={cn('state-info-context')}>{contextInfoElements}</div>
      </div>
    </div>
  );
};

export default StateInfo;
