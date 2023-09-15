import type { Meta, StoryObj } from '@storybook/react';
import { RpcInput } from './RpcInput';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/RpcInput',
    component: RpcInput,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
        backgrounds: {
            default: 'white',
            values: [
                {
                    name: 'eden',
                    value: '#181E45'
                },
                {
                    name: 'white',
                    value: '#FFFFFF'
                }
            ]
        }
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
} satisfies Meta<typeof RpcInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args


export const Default: Story = {
    args: {
        rpcUrl: "https://polygon-mumbai.blockpi.network/v1/rpc/public"
    },
};
