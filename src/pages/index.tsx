import Head from 'next/head';

import HomePage from './user/homepage';
import { Layout } from '@/layouts/user/layout';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Libersquare </title>
    </Head>
    <HomePage />
  </>
);

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Page;
