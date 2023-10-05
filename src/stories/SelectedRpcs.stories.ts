import type { Meta, StoryObj } from '@storybook/react';
import { SelectedRpcs } from './SelectedRpcs';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/SelectedRpcs',
    component: SelectedRpcs,
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
} satisfies Meta<typeof SelectedRpcs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


export const Default: Story = {
    args: {
        rpcData: [
            {
                url: "https://polygon-mumbai.blockpi.network/v1/rpc/public"
            },
            {
                url: "https://polygon-testnet.public.blastapi.io"
            },
            {
                url: "https://rpc.ankr.com/polygon_mumbai"
            },
            {
                url: "https://polygon-mumbai.g.alchemy.com/v2/demo"
            },
            {
                url: "https://matic-mumbai.chainstacklabs.com"
            },
        ]
    },
};
