import { Category } from 'src/models';
import styles from 'styles/menu.module.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface CategoryProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoryProps) => {
  console.log(categories);
  return (
    <Slide easing="ease">
      <ul className={styles.categoryList}>
        {categories.map((category) => {
          return (
            <li className={styles.categoryItem} key={category.id}>
              {category.title}
            </li>
          );
        })}
      </ul>
    </Slide>
  );
};

export default Categories;
