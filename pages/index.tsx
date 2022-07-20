import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import QuizContent from '../components/quiz-content';
import { connectToDatabase } from '../util/mongodb';

interface IIndexProps {
  isConnected: boolean;
}
interface IQuizData {
  question: string;
  answer: string;
}

const SStartButton = styled.button`
  -webkit-tap-highlight-color: transparent;

  color: #721342;
  width: 160px;
  border: 1px solid #581845;
  background: #fffaf0;
  height: 70px;
  padding: 6px 8px;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border-radius: 8px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :active {
    background: #cfcac1;
  }

  :disabled {
    opacity: 0.7;
  }
`;

const Home: NextPage<IIndexProps> = ({ isConnected }) => {
  const [fetching, setFetching] = useState(false);
  const [quizData, setQuizData] = useState<IQuizData[]>([]);

  const onStartClick = async () => {
    setFetching(true);

    fetch('/api/quizzes')
      .then((res) => res.json())
      .then(({ quizzes }) => {
        setQuizData(quizzes);
        setFetching(false);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Quizzes</title>
        <meta name="description" content="Let's get quizzical" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!isConnected && <div>Not connected</div>}
        {!quizData.length && (
          <SStartButton onClick={onStartClick} disabled={fetching}>
            Start Quiz
          </SStartButton>
        )}
        {!!quizData.length && <QuizContent quizzes={quizData} />}
      </main>

      <footer className={styles.footer}>
        © 2022 Sean Collings. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  try {
    await (
      await connectToDatabase()
    ).client;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
