import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const buttonStyles = cva(
    [
        'flex items-center justify-center gap-2 px-6 py-2.5 font-medium text-sm leading-tight rounded-md',
        'focus:outline-none focus-visible:ring-offset-2 focus-visible:ring-2',
        'transition duration-150 ease-in-out'
    ],
    {
        variants: {
            intent: {
                primary: [],
                secondary: []
            },
            style: {
                solid: [
                    'shadow-md text-slate-50',
                    'hover:bg-blue-600 hover:shadow-lg',
                    'focus-visible:bg-blue-600 focus-visible:shadow-lg',
                    'active:bg-blue-800 active:shadow-lg'
                ],
                outline: [
                    'py-2 border border-slate-400 bg-slate-50',
                    'hover:border-blue-600 hover:text-blue-600',
                    'focus-visible:text-blue-600 focus-visible:border-blue-600',
                    'active:text-blue-800 active:border-blue-800 active:bg-black active:bg-opacity-10'
                ]
            },
            fullWidth: { true: 'w-full' },
            uppercase: { true: 'uppercase' }
        },
        defaultVariants: {
            intent: 'primary',
            style: 'solid'
        },
        compoundVariants: [
            // Applied via:
            //   `button({ intent: "primary", size: "medium" })`
            {
                intent: 'primary',
                style: 'solid',
                class: 'bg-black'
            },
            {
                intent: 'primary',
                style: 'outline',
                class: 'border-black'
            },
            {
                intent: 'secondary',
                style: 'solid',
                class: 'bg-gray-700 '
            },
            {
                intent: 'secondary',
                style: 'outline',
                class: 'border-gray-700 text-gray-700'
            }
        ]
    }
);

interface ButtonProps {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

export interface Props extends ButtonProps, VariantProps<typeof buttonStyles> {}

export default function Button({
    intent,
    style,
    fullWidth,
    uppercase,
    children,
    onClick,
    href,
    ...props
}: Props) {
    return href ? (
        <Link
            href={href}
            className={buttonStyles({ intent, style, fullWidth, uppercase })}
            {...props}
        >
            {children}
        </Link>
    ) : (
        <button
            onClick={onClick}
            className={buttonStyles({ intent, style, fullWidth, uppercase })}
            {...props}
        >
            {children}
        </button>
    );
}
