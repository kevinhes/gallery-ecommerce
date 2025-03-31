import { useNavigate } from 'react-router-dom';
import {
  checkIsLogin
} from '../../helpers/adminProduct';
import { useEffect } from 'react';

export default function DashboardIndex() {
  const navigate = useNavigate()

  useEffect(() => {
    (async() => {
      await checkIsLogin(navigate)
    })()
  }, [])
  return (
    <>
      <h1>Dashborad Index</h1>
    </>
  );
}
