import React from 'react';
import cn from './classNames';
import { ReactComponent as IconAlarm1 } from './assets/alarm_1.svg';
import { ReactComponent as IconAlarm2 } from './assets/alarm_2.svg';
import { ReactComponent as IconChime } from './assets/chime.svg';
import { ReactComponent as IconStopwatch } from './assets/stopwatch.svg';

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
  const Icon = alarmNumber === 1 ? IconAlarm1 : IconAlarm2;

  if (shouldBlink) {
    return <Icon data-state="blinking" {...props} />;
  } else if (shouldShow) {
    return <Icon data-state="enabled" {...props} />;
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
    blinking: [
      'alive.chime-status.enabled.beep',
      'alive.main.displays.out.chime',
    ],
  };
  const shouldBlink = iconStates.blinking.some(state.matches);
  const shouldShow =
    state.matches(iconStates.enabled) &&
    (timeDisplayStates.some(state.matches) || state.matches(alarmsBeepState));

  if (shouldBlink) {
    return <IconChime data-state="blinking" {...props} />;
  } else if (shouldShow) {
    return <IconChime data-state="enabled" {...props} />;
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
    isRunning &&
    (timeDisplayStates.some(state.matches) || state.matches(alarmsBeepState));

  if (shouldBlink) {
    return <IconStopwatch data-state="blinking" {...props} />;
  } else if (shouldShow) {
    return <IconStopwatch data-state="enabled" {...props} />;
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
