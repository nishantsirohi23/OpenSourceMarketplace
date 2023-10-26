// ... (existing code)
import React, { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import DashboardContent from '../sidenav_pages/DashboardContent';
import ProfileContent from '../sidenav_pages/ProfileContent';
import FeedContent from '../sidenav_pages/FeedContent';
import ProjectContent from '../sidenav_pages/ProjectContent';
import MessagesContent from '../sidenav_pages/MessageContent';
import CollabContent from '../sidenav_pages/CollabContent';



const DashboardCollab = () => {
  const [selectedButton, setSelectedButton] = useState('dashboard');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <Flex>
      {/* Sidebar */}
      <Box
        bg="gray.900"
        w="250px"
        h="95vh"
        borderColor="gray.300"
        p={4}
        margin={5}
        justifyContent={"start"}
        position="fixed"
        borderRadius="10px 10px 10px 10px"
        paddingBottom="4rem"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <VStack spacing={4} width="100%">
          <Text fontSize="2xl" fontWeight="bold" color="white">
            OpenSpace
          </Text>
          {/* Add your sidebar links here */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            w={"100%"}
            borderRadius="10px 10px 10px 10px"
          >
            <HStack
              _hover={{ bg: 'pink.200' }}
              p={2}
              w="100%"
              borderRadius="10px 10px 10px 10px"
              bg={selectedButton === 'dashboard' ? 'pink.500' : 'transparent'}
              onClick={() => handleButtonClick('dashboard')}
            >
              <IconButton
                aria-label="Navigate to Page 1"
                icon={<ChevronRightIcon />}
                size="sm"
                variant="ghost"
                color="white"
              />
              <Text color="white">Dashboard</Text>
            </HStack>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width={"100%"}
          >
            <HStack
              _hover={{ bg: 'pink.200' }}
              p={2}
              w="100%"
              borderRadius="10px 10px 10px 10px"
              bg={selectedButton === 'profile' ? 'pink.500' : 'transparent'}
              onClick={() => handleButtonClick('profile')}
            >
              <IconButton
                aria-label="Navigate to Page 2"
                icon={<ChevronRightIcon />}
                size="sm"
                variant="ghost"
                color="white"
              />
              <Text color="white">Profile</Text>
            </HStack>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width={"100%"}
          >
            <HStack
              _hover={{ bg: 'pink.200' }}
              p={2}
              w="100%"
              borderRadius="10px 10px 10px 10px"
              bg={selectedButton === 'feed' ? 'pink.500' : 'transparent'}
              onClick={() => handleButtonClick('feed')}
            >
              <IconButton
                aria-label="Navigate to Collabs"
                icon={<ChevronRightIcon />}
                size="sm"
                variant="ghost"
                color="white"
              />
              <Text color="white">Feed</Text>
            </HStack>
          </Box>
       
      
          {/* Add more sidebar links as needed */}
          
          {/* Projects */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width={"100%"}
          >
            <HStack
              _hover={{ bg: 'pink.200' }}
              p={2}
              w="100%"
              borderRadius="10px 10px 10px 10px"
              bg={selectedButton === 'projects' ? 'pink.500' : 'transparent'}
              onClick={() => handleButtonClick('projects')}
            >
              <IconButton
                aria-label="Navigate to Projects"
                icon={<ChevronRightIcon />}
                size="sm"
                variant="ghost"
                color="white"
              />
              <Text color="white">Projects</Text>
            </HStack>
          </Box>

          {/* Messages */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width={"100%"}
          >
            <HStack
              _hover={{ bg: 'pink.200' }}
              p={2}
              w="100%"
              borderRadius="10px 10px 10px 10px"
              bg={selectedButton === 'messages' ? 'pink.500' : 'transparent'}
              onClick={() => handleButtonClick('messages')}
            >
              <IconButton
                aria-label="Navigate to Messages"
                icon={<ChevronRightIcon />}
                size="sm"
                variant="ghost"
                color="white"
              />
              <Text color="white">Messages</Text>
            </HStack>
          </Box>

          {/* Collabs */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width={"100%"}
          >
            <HStack
              _hover={{ bg: 'pink.200' }}
              p={2}
              w="100%"
              borderRadius="10px 10px 10px 10px"
              bg={selectedButton === 'collabs' ? 'pink.500' : 'transparent'}
              onClick={() => handleButtonClick('collabs')}
            >
              <IconButton
                aria-label="Navigate to Collabs"
                icon={<ChevronRightIcon />}
                size="sm"
                variant="ghost"
                color="white"
              />
              <Text color="white">Collabs</Text>
            </HStack>
          </Box>
        </VStack>
      </Box>

      <Box flex="1" p={4} marginLeft="280px">
        {selectedButton === 'dashboard' ? (
          <DashboardContent />
        ) : selectedButton === 'profile' ? (
          <ProfileContent />
          ) : selectedButton === 'feed' ? (
            <FeedContent />
        ) : selectedButton === 'projects' ? (
          // Render your "Projects" component here
          <ProjectContent />
    
        ) : selectedButton === 'messages' ? (
          // Render your "Messages" component here
          <MessagesContent />
        ) : selectedButton === 'collabs' ? (
          // Render your "Collabs" component here
          <CollabContent />
        ) : null}
      </Box>
    </Flex>
  );
};

export default DashboardCollab;
