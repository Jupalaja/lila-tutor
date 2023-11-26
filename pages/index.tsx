import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { questrialFont } from "@/utils";
import { MainContent, ProgressBar } from "@/components";
import classNames from "classnames";
import { SharedStatesProvider, useQuestions } from "@/contexts";

export default function Home() {
  const { percent } = useQuestions();

  return (
    <>
      <Head>
        <title>Lila Tutor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Formulario de registro para tutores de Sherpal"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <ProgressBar width={percent} />
      </header>
      <main className={classNames(styles.main, questrialFont.className)}>
        <SharedStatesProvider>
          <MainContent />
        </SharedStatesProvider>
      </main>
    </>
  );
}
