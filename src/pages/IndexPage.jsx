import { useDispatch } from "react-redux";
import FrontNavbar from '../components/nav/FrontNavbar';
import FooterNavbar from "../components/nav/FooterNavbar";
import { Outlet } from 'react-router-dom';
import { useEffect } from "react";

import { getShoppingCart } from "../slice/shoppingCartSlice";

export default function IndexPage() {
  const dispatch = useDispatch()

  // const shoppingCartList = useSelector((state) => {
  //   return state.shoppingCart.shoppingCartList
  // });

  useEffect(() => {
      dispatch(getShoppingCart())
    }, [])
  return (
    <>
      <FrontNavbar />
      <Outlet />
      <FooterNavbar />
    </>
  );
}
