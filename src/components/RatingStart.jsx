import React from "react";
import StarRatings from "react-star-ratings";
export default function StarRating({ rating }) {
    // const convertNumber = parseFloat(rating).toFixed(1);

    return (
        <StarRatings
            rating={rating}
            starRatedColor="#ffcc00"
            numberOfStars={5}
            starDimension="12px"
            starSpacing="1px"
            name="rating"
        />
    );
}
