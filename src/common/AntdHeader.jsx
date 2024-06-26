import React from "react";
import { Layout, Menu } from "antd";
import AntdButton from "./AntdButtons";
import PopOver from "../components/auth/PopOver";
import DynamicTabs from "../components/auth";

import { useDispatch } from "react-redux";
import { logOut } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";
import { useLogout } from "../services/auth/login";

const { Header } = Layout;

const AntdHeader = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAuthHook(null);
  const { mutateAsync, isError, isPending } = useLogout();
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    try {
      e.preventDefault();
      await mutateAsync();
      dispatch(logOut());
      navigate("/");
    } catch (e) {
      console.error(`Error logout ${e}`);
    }
  };

  return (
    <Layout>
      <Header className="bg-[#888] bg-opacity-70 grid grid-cols-12 items-center text-lg bg-gradient-to-r from-black via-black to-transparent bg-opacity-70 text-[#f5f5f5]">
        <div className="lg:col-span-4">Logo</div>
        <div className="lg:col-span-4">
          <Menu
            mode="horizontal"
            className="bg-yellow-400 bg-opacity-10 text-lg font-semibold flex justify-center"
          >
            <Menu.Item key="1" className=" !text-[#f5f5f5]">
              Find Jobs
            </Menu.Item>
            <Menu.Item key="2" className="!text-[#f5f5f5]">
              Companies
            </Menu.Item>
            <Menu.Item key="3" className="!text-[#f5f5f5]">
              Carrier Mentoring
            </Menu.Item>
          </Menu>
        </div>
        {!isAuthenticated && (
          <div className="flex gap-2 items-center lg:col-span-4 justify-end">
            <PopOver content={<DynamicTabs dataKey={"login"} />}>
              <div>
                <AntdButton
                  classNames={
                    "bg-transparent !border-[#F5F5F5] text-[#F5F5F5] px-7 h-10"
                  }
                >
                  Sign Up
                </AntdButton>
              </div>
            </PopOver>
            <PopOver content={<DynamicTabs dataKey={"registration"} />}>
              <div>
                <AntdButton
                  classNames={"!border-[#F5F5F5] text-[#F5F5F5] px-7 h-10"}
                >
                  Register
                </AntdButton>
              </div>
            </PopOver>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex justify-end w-full lg:col-span-4">
            <PopOver
              content={
                <div className="flex flex-col gap-2">
                  <>Are you sure you want to logout?</>
                  <AntdButton
                    onClick={handleLogOut}
                    classNames={"bg-[#000000] text-[#F5F5F5]  h-10"}
                  >
                    Ok
                  </AntdButton>
                </div>
              }
            >
              <AntdButton
                classNames={"!border-[#F5F5F5] text-[#F5F5F5] px-7 h-10"}
                loading={isError ? false : isPending}
              >
                Logout
              </AntdButton>
            </PopOver>
          </div>
        )}
      </Header>
    </Layout>
  );
};

export default AntdHeader;
