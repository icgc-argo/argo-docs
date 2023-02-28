import Image from "next/image";
import styles from "./page.module.css";
import ContentBlock from "@/components/ContentBlock";

export default function Home() {
  return (
    <main className={styles.main}>
      <ContentBlock color={undefined} title={undefined} icon={undefined}>
        I am content block
      </ContentBlock>
    </main>
  );
}
