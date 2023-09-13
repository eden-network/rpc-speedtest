import type { Meta, StoryObj } from '@storybook/react';
import { ScoreBoard } from './ScoreBoard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/ScoreBoard',
    component: ScoreBoard,
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
} satisfies Meta<typeof ScoreBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


export const Waiting: Story = {
    args: {
        rows: [{
            rank: 1,
            rpc: "https://polygon-testnet.public.blastapi.io",
            first: 2,
            second: 0,
            third: 1,
        },
        {
            rank: 2,
            rpc: "https://polygon-testnet.public.blastapi.io",
            first: 1,
            second: 1,
            third: 1,
        }]
    },
};
