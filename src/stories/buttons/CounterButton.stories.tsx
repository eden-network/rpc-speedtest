import type { Meta, StoryObj } from '@storybook/react';
import { CounterButton } from '../../components/CounterButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Example/CounterButton',
    component: CounterButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
        backgrounds: {
            default: 'eden',
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
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof CounterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plus: Story = {
    args: {
        add: true
    },
};

export const Minus: Story = {
    args: {
        add: false,
    },
};

