import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import { SocialIcon } from "react-social-icons"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>echobucket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>echobucket</h1>
        <p className={styles.description}>
          I&apos;m a developer and video game player. You can follow my socials below
        </p>
        <ul className={styles.socials}>
          <li>
            <SocialIcon
              className={styles.socialIcon}
              fgColor="#ffffff"
              url="https://twitch.tv/echobucket"
            />
          </li>
          <li>
            <SocialIcon
              className={styles.socialIcon}
              fgColor="#ffffff"
              url="https://youtube.com/echobucket"
            />
          </li>
          <li>
            <SocialIcon
              className={styles.socialIcon}
              fgColor="#ffffff"
              url="https://instagram.com/_echobucket"
            />
          </li>
        </ul>
      </main>
      <footer className={styles.footer}>
        <Link href="/minecraft">Minecraft Server Status</Link>
      </footer>
    </div>
  )
}

export default Home
