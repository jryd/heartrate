import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

jest.mock('react-flip-numbers', () => ({
  __esModule: true,
  default: ({numbers}) => <span>{numbers}</span>
}));
jest.mock('react-chartjs-2', () => ({
  Line: () => <canvas data-testid="line-chart" />,
}));

const mockBluetooth = () => {
  const startNotifications = jest.fn();
  const addEventListener = jest.fn();

  const getCharacteristic = jest.fn().mockResolvedValue({
    startNotifications,
    addEventListener,
  });

  const getPrimaryService = jest.fn().mockResolvedValue({
    getCharacteristic,
  });

  const connect = jest.fn().mockResolvedValue({
    getPrimaryService
  });

  const requestDevice = jest.fn().mockResolvedValue({
    gatt: {
      connect,
    }
  });

  global.navigator.bluetooth = {
    requestDevice,
  };

  return {
    requestDevice,
    connect,
    getPrimaryService,
    getCharacteristic,
    addEventListener,
    startNotifications,
  };
}
describe('App', () => {
  it('renders', () => {
    render(<App />);
  });

  it('requests heartrate devices when you click pair', async () => {
    render(<App />);

    const {requestDevice} = mockBluetooth();

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(requestDevice).toHaveBeenCalledWith(jasmine.objectContaining({"filters": [{"services": ["heart_rate"]}]}));
  });

  it('connects to the heartrate device once you pick one', async () => {
    render(<App />);

    const {connect} = mockBluetooth();

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(connect).toHaveBeenCalled();
  });

  it('requests the heart rate primary service when it connects to the device', async () => {
    render(<App />);

    const {getPrimaryService} = mockBluetooth();

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(getPrimaryService).toHaveBeenCalledWith('heart_rate');
  });

  it('requests the heart rate measurement characteristic when it connects to the primary service', async () => {
    render(<App />);

    const {getCharacteristic} = mockBluetooth();

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(getCharacteristic).toHaveBeenCalledWith('heart_rate_measurement');
  });

  it('subscribes to heartrate changes', async () => {
    render(<App />);

    const {addEventListener} = mockBluetooth();

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(addEventListener).toHaveBeenCalledWith('characteristicvaluechanged', jasmine.any(Function));
  });

  it('starts notifications on the heart rate measurement characteristic', async () => {
    render(<App />);

    const {startNotifications} = mockBluetooth();

    await act(async () => userEvent.click(screen.getByRole('button')));

    expect(startNotifications).toHaveBeenCalled();
  });

  it('displays your current heart rate', async () => {
    render(<App />);

    expect(screen.getByText(0)).toBeInTheDocument();

    let characteristicValueChanged = null;

    const {addEventListener} = mockBluetooth();

    addEventListener.mockImplementation((event, callback) => characteristicValueChanged = callback);

    await act(async () => userEvent.click(screen.getByRole('button')));

    const dataView = new DataView(new ArrayBuffer(16));
    dataView.setUint8(1, 85);

    await act(async () => characteristicValueChanged({
      target: {
        value: dataView
      }
    }));

    expect(screen.getByText(85)).toBeInTheDocument();
  });

  it('renders a graph', () => {
    render(<App />);

    expect(screen.getByTestId(/line-chart/i)).toBeInTheDocument();
  });
});