import { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Logo from '@ui/Logo';
import Button from '@ui/Button';
import ThemeToggler from '@ui/ThemeToggler';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';

const mainNav = [
    { name: 'Solutions', href: '/' },
    { name: 'About', href: '/' },
    { name: 'Contact', href: '/' }
];

export default function Header() {
    const [top, setTop] = useState(true);

    // detect whether user has scrolled the page down by 10px
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <header
            className={clsx(
                'fixed  w-full z-30 md:bg-opacity-90 transition duration-150 ease-in-out',
                !top && 'bg-white backdrop-blur-sm shadow-lg'
            )}
        >
            {/* <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8"> */}
            <div
                className={clsx(
                    'relative flex flex-1 items-center justify-between',
                    'max-w-6xl h-16 mx-auto px-5 sm:px-6 lg:px-8'
                )}
            >
                {/* <div className="flex flex-1 items-center justify-between h-16"> */}
                <div className="flex flex-shrink-0 items-center">
                    <Logo />
                </div>
                <div className="flex items-center">
                    {/* Large screen navigation */}
                    <nav className="hidden sm:ml-6 sm:flex items-center">
                        <ul className="flex items-center gap-5">
                            {mainNav.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="font-medium text-sm hover:text-blue-600"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center items-center pl-5 ml-5 border-l border-l-slate-200">
                            <ThemeToggler />
                            <Button colorScheme="gray" style="link" square>
                                <FaGithub className="h-5 w-5" />
                            </Button>
                        </div>
                    </nav>
                </div>
                {/* Mobile navigation  */}
                <Menu as="div" className="relative sm:hidden">
                    {({ open }) => (
                        <>
                            <div className="flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Menu.Button as={Button} colorScheme="black" style="link" square>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                                    )}
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    as="nav"
                                    className="absolute right-0 top-[4rem] min-w-[16rem] bg-gray-50 font-semibold rounded-md shadow px-8 py-5"
                                >
                                    <div className="flex flex-col gap-5 pt-2 pb-4 mb-4 border-b border-b-gray-200">
                                        {mainNav.map((item) => (
                                            <Menu.Item key={item.name}>
                                                <Link href={item.href} className="w-full">
                                                    {item.name}
                                                </Link>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center">
                                            Change theme <ThemeToggler />
                                        </div>
                                        <div className="flex items-center">
                                            GitHub
                                            <Button colorScheme="gray" style="link" square>
                                                <FaGithub className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </header>
    );
}
