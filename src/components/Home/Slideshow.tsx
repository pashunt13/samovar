import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from 'styles/home.module.css';

const slideImages = [
  { path: '/images/1.jpg', alt: 'Кафе' },
  { path: '/images/cafe2.jpg', alt: 'Кафе' },
  { path: '/images/banket.jpg', alt: 'Банкетный зал' },
  { path: '/images/banket2.jpg', alt: 'Банкетный зал' },
  { path: '/images/bath1.jpg', alt: 'Баня на дровах' },
  { path: '/images/bath2.jpg', alt: 'Купели' },
  { path: '/images/pre-bath.jpg', alt: 'Предбанник' },
];

const Slideshow = () => {
  return (
    <Slide easing="ease">
      {slideImages.map((slideImage, i) => (
        <div className={styles.eachSlide} key={i}>
          <div style={{ backgroundImage: `url(${slideImage.path})` }}>
            <span>{slideImage.alt}</span>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Slideshow;
