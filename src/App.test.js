import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('renders', () => {
    render(<App />);
  });

  it('requests heartrate devices when you click pair', async () => {
    render(<App />);

    const startNotifications = jest.fn();

    const getCharacteristic = jest.fn().mockResolvedValue({
      startNotifications,
    });

    const getPrimaryService = jest.fn().mockResolvedValue({
      getCharacteristic,
    });

    const connect = jest.fn().mockResolvedValue({
      getPrimaryService
    });


    global.navigator.bluetooth = {
      requestDevice: jest.fn().mockResolvedValue({
        gatt: {
          connect,
        }
      })
    };

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(connect).toHaveBeenCalled();
  });

  it('requests the primary service when it connects to the device', async () => {
    render(<App />);

    const startNotifications = jest.fn();

    const getCharacteristic = jest.fn().mockResolvedValue({
      startNotifications,
    });

    const getPrimaryService = jest.fn().mockResolvedValue({
      getCharacteristic,
    });

    const connect = jest.fn().mockResolvedValue({
      getPrimaryService
    });

    global.navigator.bluetooth = {
      requestDevice: jest.fn().mockResolvedValue({
        gatt: {
          connect,
        }
      })
    };

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(getPrimaryService).toHaveBeenCalled();
  });

  it('requests the heartrate characteristic when it connects to the primary service', async () => {
    render(<App />);

    const startNotifications = jest.fn();

    const getCharacteristic = jest.fn().mockResolvedValue({
      startNotifications,
    });

    const getPrimaryService = jest.fn().mockResolvedValue({
      getCharacteristic,
    });

    const connect = jest.fn().mockResolvedValue({
      getPrimaryService
    });

    global.navigator.bluetooth = {
      requestDevice: jest.fn().mockResolvedValue({
        gatt: {
          connect,
        }
      })
    };

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(getCharacteristic).toHaveBeenCalled();
  });

  it('starts notifications on the heartrate characteristic', async () => {
    render(<App />);

    const startNotifications = jest.fn();

    const getCharacteristic = jest.fn().mockResolvedValue({
      startNotifications,
    });

    const getPrimaryService = jest.fn().mockResolvedValue({
      getCharacteristic,
    });

    const connect = jest.fn().mockResolvedValue({
      getPrimaryService
    });

    global.navigator.bluetooth = {
      requestDevice: jest.fn().mockResolvedValue({
        gatt: {
          connect,
        }
      })
    };

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(startNotifications).toHaveBeenCalled();
  });
});