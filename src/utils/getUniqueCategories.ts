import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";
import getCategory from "./getCategory";

interface Category {
  category: string;
  categoryName: string;
}

const getUniqueCategories = (posts: CollectionEntry<"blog">[]) => {
  const categories: Category[] = posts
    .filter(postFilter)
    .map(post => getCategory(post))
    .filter(
      (value, index, self) =>
        self.findIndex(c => c.toLowerCase() === value.toLowerCase()) === index
    )
    .map(category => ({
      category: slugifyStr(category),
      categoryName: category,
    }))
    .sort((a, b) => a.category.localeCompare(b.category));
  return categories;
};

export default getUniqueCategories;
