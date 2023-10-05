import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from '../components/ProgressBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/ProgressBar',
    component: ProgressBar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
        backgrounds: {
            default: 'eden',
            values: [
                {
                    name: 'eden',
                    value: '#181E45'
                }
            ]
        }
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


export const Waiting: Story = {
    args: {
        percentage: 0,
        isActive: false,
        color: undefined,
        allCompleted: false
    },
};

export const InProgress75: Story = {
    args: {
        percentage: 75,
        isActive: true,
        allCompleted: false
    },
};

export const InProgress25: Story = {
    args: {
        percentage: 25,
        isActive: true,
        allCompleted: false
    },
};

export const InProgress50: Story = {
    args: {
        percentage: 50,
        isActive: true,
        allCompleted: false
    },
};

export const Started: Story = {
    args: {
        percentage: 0,
        isActive: true,
        allCompleted: false
    },

};


export const Completed: Story = {
    args: {
        percentage: 100,
        isActive: true,
        allCompleted: true
    },
};

export const RecentlyCompleted: Story = {
    args: {
        percentage: 100,
        isActive: true,
        lastCompleted: true,
        allCompleted: false
    },

};

