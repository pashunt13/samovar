import { useState } from 'react';
import { Category as CategoryModel } from 'src/models';
import styles from 'styles/menu.module.css';

interface CategoryProps {
  category: CategoryModel;
  addCategoryHandler: Function;
  removeCategoryHandler: Function;
}

const Category = ({
  category,
  addCategoryHandler,
  removeCategoryHandler,
}: CategoryProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonClass, setButtonClass] = useState(styles.categoryItem);

  const categoryHandler = (id: number) => {
    if (!isClicked) {
      addCategoryHandler(id);
      setIsClicked(true);
      setButtonClass(styles.categoryItemClicked);
      return;
    }
    removeCategoryHandler(id);
    setIsClicked(false);
    setButtonClass(styles.categoryItem);
    return;
  };

  return (
    <li key={category.id}>
      <button
        className={buttonClass}
        onClick={() => categoryHandler(category.id)}
      >
        {category.title}
      </button>
    </li>
  );
};

export default Category;
