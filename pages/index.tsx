import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../src/components/Layout';
import Image from 'next/image';
import { Parallax } from 'react-parallax';
import Slideshow from 'src/components/Home/Slideshow';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Самовар</title>
        <meta
          name="description"
          content="В Самоваре можно заказать банкет в Ростове-на-Дону, у нас просторный банкетный зал, где можно отметить юбилей, сыграть свадьбу, уютное кафе, русская баня на дровах, автомойка."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="Keywords баня ростов, баня ростов-на-дону, кафе ростов, кафе ростов-на-дону, автомойка, автомойка ростов, автомойка ростов-на-дону, автомойка портовая, банкет ростов, банкет ростов-на-дону, банкетный зал, банкетный зал ростов, банкетный зал ростов-на-дону, зал для свадьбы, зал для свадьбы ростов, отметить юбилей ростов, отметить юбилей ростов-на-дону, русская кухня ростов, домашняя кухня ростов, русская баня, баня на дровах, баня на дровах ростов, кафе самовар, кафе портовая, поминальные обеды ростов, поминки ростов, уютное кафе ростов, банкет недорого ростов"
        />
      </Head>

      <section className="main-page">
        <Parallax
          className="block main-title parallax-window"
          bgImage="/images/matreshka.jpg"
          strength={500}
        >
          <h1>Самовар</h1>
          <h3>Ростов-на-Дону</h3>
        </Parallax>

        <div className="bath block parallax-window" data-parallax="scroll">
          <h1>Баня на дровах</h1>
          <Image
            src="/images/fire.jpg"
            alt='Баня в кафе "Самовар"'
            title='Баня в кафе "Самовар"'
            width="900"
            height="600"
          />
          <p>
            Вас ждет настоящая русская баня на дровах, две купели с ледяной (+3
            C&deg;) и горячей (+50 C&deg;) водой, мраморный массажный стол с
            подогревом, душ шарко, ведро-перевертыш. Дополнительно можно
            заказать услуги профессионального банщика.
            <br />
            Блюда и напитки из кафе официант доставит Вам прямо в баню! Только
            банные процедуры, дружеский и семейный отдых!
          </p>
        </div>

        <Parallax bgImage="/images/cafe.jpg" strength={500}>
          <div className="cafe block parallax-window">
            <div className="left">
              <h2>
                Кафе
                <br />
                Самовар
              </h2>
            </div>
            <div className="right">
              <h2>Организация Банкетов</h2>
            </div>
          </div>
        </Parallax>

        <div className="banket block parallax-window" data-parallax="scroll">
          <h2>Кафе Самовар</h2>
          <p>
            В кафе Самовар Вы найдете широкий ассортмент блюд русской кухни и не
            только: от домашней картошки до уток в медовом соусе. На нашем сайте
            Вы можете выбрать и заказать понравившееся Вам блюдо на странице
            <Link href="/menu">
              <a className={styles.menuLink}> Меню →</a>
            </Link>
            <br />
            <br />
            Также к Вашим услугам отдельный зал, как для небольших компаний, так
            и для торжеств до семидесяти человек, сцена для музыкантов,
            специальное банкетное меню. Заказ по тел. 240-35-68 и по тел.
            294-51-61
          </p>
          <a
            className={styles.contactsLink}
            href="#contacts"
            id="contacts-link"
            rel="nofollow"
          >
            Связаться
          </a>
        </div>

        <Slideshow />

        <div
          id="contacts"
          className="contacts block parallax-window"
          data-parallax="scroll"
        >
          <div className="title">
            <h3>Адрес и часы работы</h3>
          </div>
          <div className="large-title">МЫ ОТКРЫТЫ ДЛЯ ВАС</div>
          <div className="left">
            <h4>Адрес</h4>
            <div>
              ул. Портовая, 66а
              <br />
              Ростов-на-Дону
              <br />
              <a href="mailto:ksergey1960@gmail.com" rel="nofollow">
                Электронный адрес{' '}
              </a>
              <b>Тел</b>. +7 (863) 240-35-68
            </div>
          </div>
          <div className="right">
            <h4>Часы работы</h4>
            <div>
              Понедельник - Воскресенье
              <br />
              &mdash;
              <br />
              09:00 – 23:00 (до последнего клиента)
              <br />
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://api-maps.yandex.ru/frame/v1/-/C6UfQWmF"
              width="760"
              height="500"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
}
