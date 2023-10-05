import type { Meta, StoryObj } from '@storybook/react';

import { Percentage } from '../../components/Percentage';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/Percentage',
    component: Percentage,
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
} satisfies Meta<typeof Percentage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const InProgress: Story = {
    args: {
        percentage: 0,
        allFinished: false,
    },
};

export const Completed: Story = {
    args: {
        percentage: 100,
        allFinished: true
    },
};

export const RecentlyCompleted: Story = {
    args: {
        percentage: 100,
        lastCompleted: true,
        allFinished: false
    },


};