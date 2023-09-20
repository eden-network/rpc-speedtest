import type { Meta, StoryObj } from '@storybook/react';
import { StartButton } from './StartButton';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/StartButton',
    component: StartButton,
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
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof StartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const inActive: Story = {
    args: {
        wallets: 0,
        loops: 0,
        isConnected: false,
        currency: "ETH",
        onClick: () => { },
        initialWallet: {},
        rpcUrls: 2

    },
};

export const Active: Story = {
    args: {
        currency: "ETH",
        wallets: 9,
        loops: 4,
        isConnected: true,
        onClick: () => { },
        initialWallet: {},
        rpcUrls: 2
    },
};

