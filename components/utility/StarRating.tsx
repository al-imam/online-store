"use client";

import React from "react";
import StarRatings from "react-star-ratings";
import type { FunctionComponent } from "react";

interface StarRatingProps {
  rating: number;
  numberOfStars: number;
  changeRating: (rating: number) => void;
  starRatedColor: string;
  starEmptyColor: string;
  starHoverColor: string;
  starDimension: string;
  starSpacing: string;
  gradientPathName: string;
  ignoreInlineStyles: boolean;
  svgIconPath: string;
  svgIconViewBox: string;
  name: string;
}

const StarRating: FunctionComponent<Partial<StarRatingProps>> = (props) => (
  <StarRatings {...props} />
);

export default StarRating;
