import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import clsx from 'clsx';
import Button from '@ui/Button';
import Hero from '../components/hero';
import { FaArrowCircleRight, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <Hero />
        </Layout>
    );
}
