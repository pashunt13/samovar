import { Category } from 'src/models';
import styles from 'styles/menu.module.css';

interface CategoryProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoryProps) => {
  return (
    <ul className={styles.categoryList}>
      {categories.map((category) => {
        return (
          <li className={styles.categoryItem} key={category.id}>
            {category.title}
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
