import PropTypes from "prop-types";
import { Tabs, Tab } from "@mui/material";
import BookCategoryCss from "./BookCategory.module.css";

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <Tabs
      value={selectedCategory}
      onChange={(event, newValue) => onCategoryChange(newValue)}
      aria-label="categories tabs"
      centered={false}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      className={BookCategoryCss.tab}
    >
      <Tab label="All" value="all" />
      {categories.map((category) => (
        <Tab key={category._id} label={category.name} value={category._id} />
      ))}
    </Tabs>
  );
};

CategoryTabs.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryTabs;
