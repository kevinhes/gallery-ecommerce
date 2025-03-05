import FrontNavbar from '../components/nav/FrontNavbar';
import { Outlet } from 'react-router-dom';

export default function IndexPage() {
  return (
    <>
      <FrontNavbar></FrontNavbar>
      <Outlet></Outlet>
    </>
  );
}
