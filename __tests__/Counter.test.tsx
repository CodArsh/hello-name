// __tests__/Counter.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

test('renders initial count and increments on button press', () => {
  const { getByTestId, getByText } = render(<App />);

  const countText = getByTestId('countText');
  expect(countText.props.children).toContain(0); // Initial count

  fireEvent.press(getByText('Increment'));

  expect(countText.props.children).toContain(1); // After increment
});
