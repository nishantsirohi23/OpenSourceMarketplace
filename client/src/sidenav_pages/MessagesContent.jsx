import React from 'react';
import {
  Box,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Sidebar from "../layouts/Sidebar";
import ChatBox from "../layouts/ChatBox";
import CreateGroupModal from "../components/chats/CreateGroupModal";
import EditGroupModal from "../components/chats/EditGroupModal";
import ViewChatModal from "../components/chats/ViewChatModal";

const MessagesContent = () => {
  return (
    <div className="h-screen flex flex-col">
     
    <div className="flex flex-1">
      <Sidebar />
      <ChatBox />
    </div>
    <CreateGroupModal />
    <EditGroupModal />
    <ViewChatModal />
  </div>
  );
};

export default MessagesContent;
