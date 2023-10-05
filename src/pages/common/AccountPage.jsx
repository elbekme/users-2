import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { Button, Form, Input, Spin, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { AuthContext } from "../../context/AuthContext";
import { ENDPOINT, TOKEN } from "../../constants";
import {
  getUser,
  saveUser,
  uploadUserPhoto,
} from "../../redux/actions/accountActions";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { uploadLoading, photo, loading } = useSelector(
    (state) => state.account
  );
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUser(form));
  }, [dispatch, form]);

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button type="primary" style={{marginBottom:'20px', marginTop:'20px'}} onClick={logout}>Logout</Button>
      <h2>AccountPage </h2>
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={() => dispatch(saveUser(form))}
          name="user"
          labelCol={{
            span: 24,
            
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={(e) => dispatch(uploadUserPhoto(e))}
          >
            {photo ? (
              <img
                src={`${ENDPOINT}upload/${photo}`}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              <div>
                {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form>
      </Spin>
    </div>
  );
};

export default AccountPage;
