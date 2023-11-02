import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main} style={{ colorScheme: "dark" }}>
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
        <p className={styles.readme}>Check ReadMe for more details</p>
      </div>
    </main>
  );
}
