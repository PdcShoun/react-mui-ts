import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

test('Test App', async () => {
  render(<App />)
  const linkElement = await waitFor(() => screen.getByRole('contentinfo'))
  expect(linkElement)
})
