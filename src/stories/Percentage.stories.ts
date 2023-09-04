import type { Meta, StoryObj } from '@storybook/react';

import { Percentage } from './Percentage';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/Percentage',
    component: Percentage,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
} satisfies Meta<typeof Percentage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


export const Waiting: Story = {
    args: {
        percentage: "0%",
        completed: false
    },
};

export const InProgress: Story = {
    args: {
        percentage: "30%",
        completed: false
    },
};

export const Completed: Story = {
    args: {
        percentage: "100%",
        completed: true
    },
};
