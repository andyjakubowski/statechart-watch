import { useEffect } from 'react';

let keysDown = {
  a: false,
  b: false,
  c: false,
  d: false,
};

export const useKeyDown = function useKeyDown(send) {
  useEffect(() => {
    const handleKeyDown = function handleKeyDown(e) {
      if (keysDown?.[e.key] === true) {
        return;
      }

      switch (e.key) {
        case 'a':
          send('A_PRESSED');
          keysDown.a = true;
          break;
        case 'b':
          send('B_PRESSED');
          keysDown.b = true;
          break;
        case 'c':
          send('C_PRESSED');
          keysDown.c = true;
          break;
        case 'd':
          send('D_PRESSED');
          keysDown.d = true;
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [send]);
};

export const useKeyUp = function useKeyUp(send) {
  useEffect(() => {
    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'a':
          send('A_RELEASED');
          keysDown.a = false;
          break;
        case 'b':
          send('B_RELEASED');
          keysDown.b = false;
          break;
        case 'c':
          send('C_RELEASED');
          keysDown.c = false;
          break;
        case 'd':
          send('D_RELEASED');
          keysDown.d = false;
          break;
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [send]);
};
