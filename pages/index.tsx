import Head from 'next/head';
import Link from 'next/link';
import { Button, Grid } from 'semantic-ui-react'
// styles //
import styles from '../styles/Home.module.css';
// types //
import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Games</title>
        <meta name="description" content="games for my students" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid.Row>
        <Button.Group>
          <Link href={"/wordle"}>
            <Button content="Wordle" />
          </Link>
          <Link href={"/breakout"}>
            <Button content="Breakout" />
          </Link>

        </Button.Group>
      </Grid.Row>
    </>
  );
};

export default Home
