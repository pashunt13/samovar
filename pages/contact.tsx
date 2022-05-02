import styles from 'styles/contact.module.css';
import Layout from 'src/components/layout';
import Image from 'next/image';

export default function Contact() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>Контакты</div>
        <div className={styles.grid}>
          <Image
            priority
            src="/images/facade.jfif"
            className={styles.facadeImage}
            height={320}
            width={240}
            alt="facadeImage"
          />

          <div className={styles.list}>
            <div className={styles.listItem}>
              <div className={styles.itemTitle}>Телефон:</div>
              <div className={styles.itemValue}>240-35-68</div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.itemTitle}>Адрес:</div>
              <div className={styles.itemValue}>Ростов-на-Дону, ул. Портовая, 66а</div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.itemTitle}>Режим работы:</div>
              <div className={styles.itemValue}>Пн-Вс с 9:00 до 22:00</div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.itemTitle}>Email:</div>
              <div className={styles.itemValue}>ksergey1960@gmail.com</div>
            </div>
          </div>
        </div>

        <div className={styles.map}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4558.203185650421!2d39.68888529089974!3d47.21024570164725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e3b939569df6bd%3A0xcef28af4792406be!2z0JrQvtC80L_Qu9C10LrRgSDQodCw0LzQvtCy0LDRgA!5e0!3m2!1sru!2sru!4v1651093478711!5m2!1sru!2sru" width="100%" height="500px" loading="lazy"></iframe>
        </div>
      </div>
    </Layout>
  )
}