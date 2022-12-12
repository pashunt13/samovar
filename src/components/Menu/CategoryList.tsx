import { HEADERS } from 'src/consts';
import { Category as CategoryModel } from 'src/models';
import styles from 'styles/menu.module.css';
import Category from './Category';

interface CategoryListProps {
  categoryList: CategoryModel[];
  setItems: Function;
}

let categoryFilter: number[] = [];

const CategoryList = ({ categoryList, setItems }: CategoryListProps) => {
  const addCategoryHandler = (id: number) => {
    categoryFilter.push(id);
    return getNewItems();
  };

  const removeCategoryHandler = (id: number) => {
    categoryFilter = categoryFilter.filter((categoryId) => categoryId !== id);
    return getNewItems();
  };

  const getNewItems = async () => {
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(categoryFilter),
      });
      const data = await response.json();
      return setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

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
