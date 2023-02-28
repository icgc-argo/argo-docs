// @ts-nocheck

import Image from "next/image";
import styles from "./index.module.scss";

const ContentBlock = ({ color, title, icon, children }) => (
  <div className={styles.contentBlock} style={{ borderColor: color }}>
    <div className={styles.contentBlockHeader}>
      <span className={styles.contentBlockTitle}>{title}</span>
      <img src={icon} height={50} />
    </div>
    <div className={styles.contentBlockInner}>{children}</div>
  </div>
);

export default ContentBlock;
