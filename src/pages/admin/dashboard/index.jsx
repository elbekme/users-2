import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions/userActions";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.user);
  useEffect(() => {
    total || dispatch(getUsers());
  }, [dispatch, total]);
  return (
    <div>
      <h2>User count: {total}</h2>
    </div>
  );
};

export default DashboardPage;
