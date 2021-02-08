import cn from './classNames';

const WatchButton = (function makeWatchButton() {
  const types = ['a', 'b', 'c', 'd'];
  const events = types.reduce((result, type) => {
    result[type] = {
      mouseDown: `${type.toUpperCase()}_PRESSED`,
      mouseUp: `${type.toUpperCase()}_RELEASED`,
    };
    return result;
  }, {});

  return function WatchButton({ type, send, children: label }) {
    return (
      <button
        onMouseDown={() => send(events[type].mouseDown)}
        onMouseUp={() => send(events[type].mouseUp)}
        className={cn(`button-${type}`)}
      >
        {label}
      </button>
    );
  };
})();

export default WatchButton;
