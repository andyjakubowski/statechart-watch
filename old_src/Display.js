import React from 'react';
import cn from './classNames';
import colon from './assets/colon.svg';
import period from './assets/period.svg';
import prime from './assets/prime.svg';
import doublePrime from './assets/double_prime.svg';
import weakBattery from './assets/weak_battery.svg';
import am from './assets/am.svg';
import pm from './assets/pm.svg';

const Colon = function Colon() {
  return <img className={cn('colon-icon')} src={colon} alt="Colon" />;
};

const WeakBattery = function WeakBattery() {
  return (
    <img
      className={cn('weak-battery-icon')}
      src={weakBattery}
      alt="Weak battery"
    />
  );
};

const Primes = function Primes() {
  return (
    <>
      <img className={cn('prime-icon')} src={prime} alt="Prime" />
      <img
        className={cn('double-prime-icon')}
        src={doublePrime}
        alt="Double prime"
      />
    </>
  );
};

const Period = function Period() {
  return <img className={cn('period-icon')} src={period} alt="Period" />;
};

const AM = function AM() {
  return <img className={cn('am-icon')} src={am} alt="AM symbol" />;
};

const PM = function PM() {
  return <img className={cn('pm-icon')} src={pm} alt="PM symbol" />;
};

const Digits1 = function Digits1({ children }) {
  return <div className={cn('digits1')}>{children}</div>;
};

const Digits2 = function Digits2({ children }) {
  return <div className={cn('digits2')}>{children}</div>;
};

const Digits3 = function Digits3({ children }) {
  return <div className={cn('digits3')}>{children}</div>;
};

const LCD = function LCD({ state, children }) {
  const weakBatteryState = 'alive.power.blink';
  const isWeakBattery = state.matches(weakBatteryState);
  const weakBatteryIndicator = isWeakBattery ? <WeakBattery /> : undefined;

  return (
    <div className={cn('display')}>
      {weakBatteryIndicator}
      {children}
    </div>
  );
};

const formatHr = function formatHr(mode, hr) {
  if (mode === '24h') {
    return hr;
  }

  const num = hr % 12;
  if (num === 0) {
    return 12;
  } else {
    return num;
  }
};

const getPeriodIndicator = (function makeGetPeriodIndicator() {
  const isPM = function isPM(hr) {
    return Math.floor(hr / 12) >= 1;
  };

  return function getPeriodIndicator(mode, hr) {
    if (mode === '24h') {
      return undefined;
    }

    return isPM(hr) ? <PM /> : <AM />;
  };
})();

const TimeDisplay = function TimeDisplay({ state }) {
  const { sec, oneMin, tenMin, hr, mode } = state.context.T;
  const formattedSec = String(sec).padStart(2, '0');
  const formattedHr = formatHr(mode, hr);
  const PeriodIndicator = getPeriodIndicator(mode, hr);

  return (
    <LCD state={state}>
      <Digits1>{formattedHr}</Digits1>
      <Colon />
      <Digits2>
        {tenMin}
        {oneMin}
      </Digits2>
      {PeriodIndicator}
      <Digits3>{formattedSec}</Digits3>
    </LCD>
  );
};

const DateDisplay = function DateDisplay({ state }) {
  const { mon, date, day } = state.context.T;
  const days = ['Mo', 'Tu', 'We', 'Th', 'fr', 'sa', 'su'];

  return (
    <LCD state={state}>
      <Digits1>{mon + 1}</Digits1>
      <Period />
      <Digits2>{date + 1}</Digits2>
      <Digits3>{days[day]}</Digits3>
    </LCD>
  );
};

const TimeUpdateDisplay = function TimeUpdateDisplay({ state, updateState }) {
  const { sec, oneMin, tenMin, hr, mode } = state.context.T;
  const classNames = ['sec', '1min', '10min', 'hr'].reduce((result, el) => {
    result[el] = el === updateState ? cn(null, 'blinking') : undefined;
    return result;
  }, {});
  const formattedHr = formatHr(mode, hr);
  const PeriodIndicator = getPeriodIndicator(mode, hr);
  const formattedSec = String(sec).padStart(2, '0');
  return (
    <LCD state={state}>
      <Digits1>
        <span className={classNames.hr}>{formattedHr}</span>
      </Digits1>
      <Colon />
      <Digits2>
        <span className={classNames['10min']}>{tenMin}</span>
        <span className={classNames['1min']}>{oneMin}</span>
      </Digits2>
      {PeriodIndicator}
      <Digits3>
        <span className={classNames['sec']}>{formattedSec}</span>
      </Digits3>
    </LCD>
  );
};

const DateUpdateDisplay = function DateUpdateDisplay({ state, updateState }) {
  const { mon, date, day } = state.context.T;
  const days = ['Mo', 'Tu', 'We', 'Th', 'fr', 'sa', 'su'];
  const classNames = ['mon', 'date', 'day'].reduce((result, el) => {
    result[el] = el === updateState ? cn(null, 'blinking') : undefined;
    return result;
  }, {});
  return (
    <LCD state={state}>
      <Digits1>
        <span className={classNames.mon}>{mon + 1}</span>
      </Digits1>
      <Period />
      <Digits2>
        <span className={classNames.date}>{date + 1}</span>
      </Digits2>
      <Digits3>
        <span className={classNames.day}>{days[day]}</span>
      </Digits3>
    </LCD>
  );
};
const YearUpdateDisplay = function YearUpdateDisplay({ state, updateState }) {
  const yearString = String(state.context.T.year);
  const firstTwoDigits = yearString.slice(0, 2);
  const lastTwoDigits = yearString.slice(2);
  return (
    <LCD state={state}>
      <Digits2>
        <span className={cn(null, 'blinking')}>{firstTwoDigits}</span>
      </Digits2>
      <Digits3>
        <span className={cn(null, 'blinking')}>{lastTwoDigits}</span>
      </Digits3>
    </LCD>
  );
};
const ModeUpdateDisplay = function ModeUpdateDisplay({ state, updateState }) {
  const { mode } = state.context.T;
  const modeDigits = mode === '12h' ? '12' : '24';

  return (
    <LCD state={state}>
      <Digits1>
        <span className={cn(null, 'blinking')}>{modeDigits}</span>
      </Digits1>
      <Digits2>h</Digits2>
    </LCD>
  );
};

const UpdateDisplay = function UpdateDisplay({ state }) {
  const states = [
    'sec',
    '1min',
    '10min',
    'hr',
    'mon',
    'date',
    'day',
    'year',
    'mode',
  ].reduce((result, key) => {
    result[key] = `alive.main.displays.regularAndBeep.regular.update.${key}`;
    return result;
  }, {});
  const updateTypes = {
    time: ['sec', '1min', '10min', 'hr'],
    date: ['mon', 'date', 'day'],
    year: ['year'],
    mode: ['mode'],
  };
  const currentState = Object.keys(states).find((key) =>
    state.matches(states[key])
  );
  const currentUpdateType = Object.keys(updateTypes).find((key) =>
    updateTypes[key].includes(currentState)
  );
  const displays = {
    time: <TimeUpdateDisplay state={state} updateState={currentState} />,
    date: <DateUpdateDisplay state={state} updateState={currentState} />,
    year: <YearUpdateDisplay state={state} updateState={currentState} />,
    mode: <ModeUpdateDisplay state={state} updateState={currentState} />,
  };

  return displays[currentUpdateType];
};

const AlarmDisplay = function AlarmDisplay({ state, alarmNumber }) {
  const { mode } = state.context.T;
  const { oneMin, tenMin, hr } = state.context[`T${alarmNumber}`];
  const states = {
    '1min': `alive.main.displays.out.update-${alarmNumber}.1min`,
    '10min': `alive.main.displays.out.update-${alarmNumber}.10min`,
    hr: `alive.main.displays.out.update-${alarmNumber}.hr`,
    on: `alive.main.displays.out.alarm-${alarmNumber}.on`,
    off: `alive.main.displays.out.alarm-${alarmNumber}.off`,
  };
  const currentState = Object.keys(states).find((key) =>
    state.matches(states[key])
  );
  const isEnabled = state.matches(`alive.alarm-${alarmNumber}-status.enabled`);
  const statusLabel = isEnabled ? 'on' : 'of';
  const classNames = Object.keys(states).reduce((result, el) => {
    result[el] = el === currentState ? cn(null, 'blinking') : undefined;
    return result;
  }, {});
  const formattedHr = formatHr(mode, hr);
  const PeriodIndicator = getPeriodIndicator(mode, hr);

  return (
    <LCD state={state}>
      <Digits1>
        <span className={classNames.hr}>{formattedHr}</span>
      </Digits1>
      <Colon />
      <Digits2>
        <span className={classNames['10min']}>{tenMin}</span>
        <span className={classNames['1min']}>{oneMin}</span>
      </Digits2>
      {PeriodIndicator}
      <Digits3>
        <span className={classNames['on'] || classNames['off']}>
          {statusLabel}
        </span>
      </Digits3>
    </LCD>
  );
};

const Alarm1Display = function Alarm1Display({ alarmNumber, ...props }) {
  return <AlarmDisplay alarmNumber={1} {...props} />;
};

const Alarm2Display = function Alarm2Display({ alarmNumber, ...props }) {
  return <AlarmDisplay alarmNumber={2} {...props} />;
};

const ChimeDisplay = function ChimeDisplay({ state }) {
  const states = {
    off: 'alive.main.displays.out.chime.off',
    on: 'alive.main.displays.out.chime.on',
  };
  const currentState = Object.keys(states).find((key) =>
    state.matches(states[key])
  );
  const statusLabel = currentState === 'on' ? 'on' : 'of';

  return (
    <LCD state={state}>
      <Colon />
      <Digits2>00</Digits2>
      <Digits3>
        <span className={cn(null, 'blinking')}>{statusLabel}</span>
      </Digits3>
    </LCD>
  );
};

const Regular = function Regular({ state }) {
  const states = {
    time: 'alive.main.displays.regularAndBeep.regular.time',
    date: 'alive.main.displays.regularAndBeep.regular.date',
    update: 'alive.main.displays.regularAndBeep.regular.update',
  };

  const currentState = Object.keys(states).find((key) =>
    state.matches(states[key])
  );

  const displays = {
    time: <TimeDisplay state={state} />,
    date: <DateDisplay state={state} />,
    update: <UpdateDisplay state={state} />,
  };

  return displays[currentState] || displays.time;
};

const Out = function Out({ state }) {
  const states = {
    alarm1: 'alive.main.displays.out.alarm-1',
    update1: 'alive.main.displays.out.update-1',
    alarm2: 'alive.main.displays.out.alarm-2',
    update2: 'alive.main.displays.out.update-2',
    chime: 'alive.main.displays.out.chime',
  };

  const currentState = Object.keys(states).find((key) =>
    state.matches(states[key])
  );

  const displays = {
    alarm1: <Alarm1Display state={state} />,
    update1: <Alarm1Display state={state} />,
    alarm2: <Alarm2Display state={state} />,
    update2: <Alarm2Display state={state} />,
    chime: <ChimeDisplay state={state} />,
  };

  return displays[currentState] || displays.time;
};

const getTimesFromMs = (function makeGetTimesFromMs() {
  const MS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
  const MS_PER_ONE_HUNDRETH_OF_SEC = 10;
  return function getTimesFromMs(ms) {
    const min = Math.floor(ms / MS_PER_MINUTE);
    let remainingMs = ms % MS_PER_MINUTE;
    const sec = Math.floor(remainingMs / MS_PER_SECOND);
    remainingMs = remainingMs % MS_PER_SECOND;
    const hundrethsOfSec = Math.floor(remainingMs / MS_PER_ONE_HUNDRETH_OF_SEC);
    return { min, sec, hundrethsOfSec };
  };
})();

const Stopwatch = function Stopwatch({ state }) {
  const { elapsedTotal, lap } = state.context.stopwatch;
  const states = {
    regular: 'alive.main.displays.stopwatch.displayAndRun.display.regular',
    lap: 'alive.main.displays.stopwatch.displayAndRun.display.lap',
  };
  const currentState = Object.keys(states).find((key) =>
    state.matches(states[key])
  );
  const shownTime = currentState === 'regular' ? elapsedTotal : lap;
  const { min, sec, hundrethsOfSec } = getTimesFromMs(shownTime);
  const minString = String(min).padStart(2, '0');
  const formattedSec = String(sec).padStart(2, '0');
  const hundrethsOfSecString = String(hundrethsOfSec).padStart(2, '0');

  return (
    <LCD state={state}>
      <Digits1>{minString}</Digits1>
      <Primes />
      <Colon />
      <Digits2>{formattedSec}</Digits2>
      <Digits3>{hundrethsOfSecString}</Digits3>
    </LCD>
  );
};

const Displays = {
  Regular,
  Out,
  Stopwatch,
};

const Display = function Display({ state }) {
  const states = {
    regular: 'alive.main.displays.regularAndBeep.regular',
    wait: 'alive.main.displays.wait',
    out: 'alive.main.displays.out',
    stopwatch: 'alive.main.displays.stopwatch',
  };

  const currentState = Object.keys(states).find((key) =>
    state.matches(states[key])
  );

  const displays = {
    regular: <Displays.Regular state={state} />,
    out: <Displays.Out state={state} />,
    stopwatch: <Displays.Stopwatch state={state} />,
  };

  return displays[currentState] || displays.regular;
};

export default Display;
