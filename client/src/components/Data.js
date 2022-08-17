import React from "react";
import { BsVolumeUpFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export const StaticImageData = [
  "https://cdn.stocksnap.io/img-thumbs/280h/HUBPTR7YNE.jpg",
  "https://image.shutterstock.com/image-photo/defocused-abstract-background-cake-cihamlas-260nw-2156519477.jpg",
  "https://cdn.stocksnap.io/img-thumbs/280h/BRBXSBL4EO.jpg",
  "https://cdn.stocksnap.io/img-thumbs/280h/2MJ8NPW5CN.jpg",
];

export const NavbarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    title: "Campaign",
    path: "/",
    icon: <BsVolumeUpFill />,
  },
  {
    title: "Products",
    path: "/",
    icon: <MdOutlineProductionQuantityLimits />,
  },
  {
    title: "Customers",
    path: "/",
    icon: <BsFillPersonFill />,
  },
];
