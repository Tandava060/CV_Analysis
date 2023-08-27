// JobsTable.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { JobsTable } from '../components/JobTables';


jest.mock('axios');

const mockResponse = {
    data: [
        {
            id: '1',
            title: 'Software Engineer',
            description: 'Developing software',
            skills: ['JavaScript', 'React'],
            company: 'Tech Company',
            field: 'IT',
            yearsExp: 2,
            languages: ['English'],
            certificates: [],
            educationLevel: 'Bachelor',
        },
    ],
};

beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);
});

test('fetches jobs from an API and displays them', async () => {
    render(<JobsTable />, { wrapper: MemoryRouter });

    // wait for the user to resolve
    // needs only be used in our special case
    await waitFor(() => screen.getByText('Software Engineer'));

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Company')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();
});

test('renders "Add Job" button', () => {
    render(<JobsTable />, { wrapper: MemoryRouter });

    expect(screen.getByText('Add Job')).toBeInTheDocument();
});
