import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
export default function StarRating({
    rating,
    color = "#ffcc00",
    dimension = "12px",
    spacing = "1px",
}) {
    // const convertNumber = parseFloat(rating).toFixed(1);

    return (
        <StarRatings
            rating={rating}
            starRatedColor={color}
            numberOfStars={5}
            starDimension={dimension}
            starSpacing={spacing}
            name="rating"
        />
    );
}
StarRating.propTypes = {
    rating: PropTypes.number,
    color: PropTypes.string,
    dimension: PropTypes.string,
    spacing: PropTypes.string,
};
