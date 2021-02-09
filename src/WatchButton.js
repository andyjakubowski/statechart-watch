import cn from './classNames';

const WatchButton = (function makeWatchButton() {
  const types = ['a', 'b', 'c', 'd'];
  const events = types.reduce((result, type) => {
    result[type] = {
      pointerDown: `${type.toUpperCase()}_PRESSED`,
      pointerUp: `${type.toUpperCase()}_RELEASED`,
      pointerCancel: `${type.toUpperCase()}_RELEASED`,
    };
    return result;
  }, {});

  return function WatchButton({ type, send, children: label }) {
    return (
      <button
        onPointerDown={() => send(events[type].pointerDown)}
        onPointerUp={() => send(events[type].pointerUp)}
        onPointerCancel={() => send(events[type].pointerCancel)}
        className={cn(`button-${type}`)}
      >
        {label}
      </button>
    );
  };
})();

export default WatchButton;
