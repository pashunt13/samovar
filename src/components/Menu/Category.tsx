import { useState } from 'react';
import { Category as CategoryModel } from 'src/models';
import styles from 'styles/menu.module.css';

interface CategoryProps {
  category: CategoryModel;
}

const Category = ({ category }: CategoryProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonClass, setButtonClass] = useState(styles.categoryItem);

  const categoryHandler = () => {
    if (!isClicked) {
      setIsClicked(true);
      setButtonClass(styles.categoryItemClicked);
      return;
    }
    setIsClicked(false);
    setButtonClass(styles.categoryItem);
    return;
  };

  return (
    <li className={buttonClass} key={category.id} onClick={categoryHandler}>
      {category.title}
    </li>
  );
};

export default Category;
