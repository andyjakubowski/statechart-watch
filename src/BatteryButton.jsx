import cn from './classNames';

const BatteryButton = function BatteryButton({ state, send }) {
  const isAlive = state.matches('alive');
  const buttonCn = cn('battery-button');
  const elButton = isAlive ? (
    <button className={buttonCn} onClick={() => send('REMOVE_BATTERY')}>
      Remove battery
    </button>
  ) : (
    <button className={buttonCn} onClick={() => send('INSERT_BATTERY')}>
      Insert battery
    </button>
  );
  return <div className={cn('battery-button-container')}>{elButton}</div>;
};

export default BatteryButton;
