import PageWrapper from "./components/widgets/page_wrapper/page_wrapper";
import Stars from "./components/widgets/stars/stars";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main} style={{ colorScheme: "dark" }}>
      <PageWrapper>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/app/page.js</code>
          </p>
        </div>

        <div className={styles.center}>
          <img
            className={styles.logo}
            src="/images/logo512.png"
            alt="Next.js Logo"
            priority
          />
        </div>

        <div className={styles.bottom}>
          <p>This is a NextJS template project</p>
          <p className={styles.readme}>
            Check{" "}
            <a href="https://github.com/Oaks-Solution-and-Studio/OSAS-NextJS-Template/blob/main/README.md">
              README
            </a>{" "}
            for more details
          </p>
        </div>
      </PageWrapper>
      <Stars />
    </main>
  );
}
