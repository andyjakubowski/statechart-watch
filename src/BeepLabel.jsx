import cn from './classNames';

const BeepLabel = function BeepLabel({ state }) {
  const beepStates = [
    'alive.main.displays.regularAndBeep.beep-test.beep',
    'alive.main.alarms-beep',
    'alive.chime-status.enabled.beep',
  ];

  const isBeeping = beepStates.some(state.matches);
  const dataStateBeep = isBeeping ? 'beeping' : undefined;

  return (
    <div data-state-beep={dataStateBeep} className={cn('beep-container')}>
      <img className={cn('beep-text')} src={'/assets/beep_text.svg'} alt="Beep text" />
      <img className={cn('beep-lines')} src={'/assets/beep_lines.svg'} alt="Beep lines" />
    </div>
  );
};

export default BeepLabel;
