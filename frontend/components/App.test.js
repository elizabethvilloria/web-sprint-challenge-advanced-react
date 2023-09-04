// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from './AppFunctional';
import AppClass from './AppClass'

test('Button text is rendered correctly', () => {
  const { getByText } = render(<AppFunctional />);
  expect(getByText('UP')).toBeInTheDocument();
  expect(getByText('DOWN')).toBeInTheDocument();
  expect(getByText('LEFT')).toBeInTheDocument();
  expect(getByText('RIGHT')).toBeInTheDocument();
  expect(getByText('reset')).toBeInTheDocument();
});

test('Typing in the input field updates its value', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const input = getByPlaceholderText('type email');
  expect(input.value).toBe('');
  fireEvent.change(input, {target: { value: 'test@example.com'}});
  expect(input.value).toBe('test@example.com')
});

test('Rendered headings are correct', () => {
  const { getByText } = render(<AppFunctional />);
  expect(getByText('Coordinates (2, 2)')).toBeInTheDocument();
});

test('Move count starts at 0', () => {
  const { getByText } = render(<AppFunctional />);
  expect(getByText('You moved 0 times')).toBeInTheDocument();
});

test('Email input is present', () => {
  const { getByPlaceholderText } = render(<AppFunctional />);
  const emailInput = getByPlaceholderText('type email');
  expect(emailInput).toBeInTheDocument();
});