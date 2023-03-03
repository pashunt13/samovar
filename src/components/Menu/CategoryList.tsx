import { useCallback, useEffect, useState } from 'react';
import { Category as CategoryModel } from 'src/models';
import styles from 'styles/menu.module.css';
import Category from './Category';

interface CategoryListProps {
  categoryList: CategoryModel[];
  setItems: Function;
}

const CategoryList = ({ categoryList, setItems }: CategoryListProps) => {
  const [categoryFilter, setCategoryFilter] = useState([]);

  const addCategoryHandler = (id: number) => {
    setCategoryFilter([...categoryFilter, id]);
  };

  const removeCategoryHandler = (id: number) => {
    setCategoryFilter(categoryFilter.filter((categoryId) => categoryId !== id));
  };

  const getNewItems = useCallback(async () => {
    try {
      let response;
      if (categoryFilter.length === 0) {
        response = await fetch('/api/menu/');
      } else {
        response = await fetch('/api/menu/' + categoryFilter);
      }

      const data = await response.json();
      return setItems(data);
    } catch (error) {
      console.log(error);
    }
  }, [categoryFilter, setItems]);

  useEffect(() => {
    getNewItems();
  }, [categoryFilter, getNewItems]);

  return (
    <ul className={styles.categoryList}>
      {categoryList.map((category) => {
        return (
          <Category
            category={category}
            addCategoryHandler={addCategoryHandler}
            removeCategoryHandler={removeCategoryHandler}
            key={category.id}
          />
        );
      })}
    </ul>
  );
};

export default CategoryList;
