import React from 'react';
import cn from './classNames';

const timeDisplayStates = [
  'alive.main.displays.regularAndBeep.regular.time',
  'alive.main.displays.wait',
];
const alarmsBeepState = 'alive.main.alarms-beep';

const AlarmStatus = function AlarmStatus({ state, alarmNumber, ...props }) {
  const iconStates = {
    enabled: `alive.alarm-${alarmNumber}-status.enabled`,
    blinking: [
      'alive.main.alarms-beep.both-beep',
      `alive.main.alarms-beep.alarm-${alarmNumber}-beeps`,
      `alive.main.displays.out.alarm-${alarmNumber}`,
      `alive.main.displays.out.update-${alarmNumber}`,
    ],
  };
  const shouldBlink = iconStates.blinking.some(state.matches);
  const shouldShow =
    state.matches(iconStates.enabled) &&
    (timeDisplayStates.some(state.matches) || state.matches(alarmsBeepState));
  const icon = alarmNumber === 1 ? '/assets/alarm_1.svg' : '/assets/alarm_2.svg';

  if (shouldBlink) {
    return <img data-state="blinking" src={icon} {...props} />;
  } else if (shouldShow) {
    return <img data-state="enabled" src={icon} {...props} />;
  } else {
    return '';
  }
};

const Alarm1Status = function Alarm1Status({ state, ...props }) {
  return <AlarmStatus alarmNumber={1} state={state} {...props} />;
};

const Alarm2Status = function Alarm2Status({ state, ...props }) {
  return <AlarmStatus alarmNumber={2} state={state} {...props} />;
};

const ChimeStatus = function ChimeStatus({ state, ...props }) {
  const iconStates = {
    enabled: 'alive.chime-status.enabled.quiet',
    blinking: ['alive.chime-status.enabled.beep', 'alive.main.displays.out.chime'],
  };
  const shouldBlink = iconStates.blinking.some(state.matches);
  const shouldShow =
    state.matches(iconStates.enabled) &&
    (timeDisplayStates.some(state.matches) || state.matches(alarmsBeepState));

  if (shouldBlink) {
    return <img data-state="blinking" src={'/assets/chime.svg'} {...props} />;
  } else if (shouldShow) {
    return <IconChime data-state="enabled" src={'/assets/chime.svg'} {...props} />;
  } else {
    return '';
  }
};

const StopwatchStatus = function StopwatchStatus({ state, ...props }) {
  const { start, elapsedBeforeStart, elapsedTotal } = state.context.stopwatch;
  const isPaused = elapsedBeforeStart === elapsedTotal;
  const isRunning = !!start && !isPaused;
  const iconStates = {
    blinking: 'alive.main.displays.stopwatch',
  };
  const shouldBlink = state.matches(iconStates.blinking);
  const shouldShow =
    isRunning && (timeDisplayStates.some(state.matches) || state.matches(alarmsBeepState));
  if (shouldBlink) {
    return <img data-state="blinking" src={'/assets/stopwatch.svg'} {...props} />;
  } else if (shouldShow) {
    return <img data-state="enabled" src={'/assets/stopwatch.svg'} {...props} />;
  } else {
    return '';
  }
};

const StatusIcons = function StatusIcons({ state }) {
  return (
    <>
      <Alarm1Status state={state} className={cn('alarm1-icon')} />
      <Alarm2Status state={state} className={cn('alarm2-icon')} />
      <ChimeStatus state={state} className={cn('chime-icon')} />
      <StopwatchStatus state={state} className={cn('stopwatch-icon')} />
    </>
  );
};

export default StatusIcons;
