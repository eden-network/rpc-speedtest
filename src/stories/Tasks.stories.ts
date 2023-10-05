import type { Meta, StoryObj } from '@storybook/react';
import { Tasks } from '../components/Tasks';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/Tasks',
    component: Tasks,
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
} satisfies Meta<typeof Tasks>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


export const Waiting: Story = {
    args: {
        tasks: [{
            percentage: 100,
            name: "Transfer to the Genesis Wallet",
            isActive: false,
        },
        {
            percentage: 100,
            name: "Create Speed Test wallets",
            isActive: false,
        },
        {
            percentage: 50,
            name: "Transfer to wallets",
            isActive: true,
        },
        {
            percentage: 0,
            name: "Loop 1",
            isActive: true,
        },
        {
            percentage: 0,
            name: "Loop 2",
            isActive: false,
        },
        {
            percentage: 0,
            name: "Loop 3",
            isActive: false,
        },
        {
            percentage: 0,
            name: "Loop 4",
            isActive: false,
        }]
    },
};

// export const InProgress: Story = {
//     args: {
//     },
// };

// export const Completed: Story = {
//     args: {
//     },
// };
