import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/product.context";
import './category.styles.scss';


const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category.toUpperCase()]);

    useEffect(() => {
        setProducts(categoriesMap[category.toUpperCase()]);
    }, [category, categoriesMap])
    return (
        <Fragment>
            <h2 className="category-title">{category}</h2>
            <div className="category-page-container">
                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Category;