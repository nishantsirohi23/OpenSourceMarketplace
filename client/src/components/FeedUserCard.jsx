import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Progress,
  Flex,
  Divider,
  Center,
  Button
} from '@chakra-ui/react';
import { MdBuild , MdCall } from "react-icons/md"
import { UserState } from "../context/UserProvider";
import { FaSearch } from "react-icons/fa";
import { ChatState } from "../context/ChatProvider";
import { SideBarState } from "../context/SideBarProvider";
import { chatActions } from "../data/action";
import CircularLoader from "./customs/CircularLoader";
import { createChat } from "./../utils/axiosHelper";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useToast } from '@chakra-ui/react';

const FeedUserCard = ({ myuser, project, matchPercentage }) => {

  const { user, searchUser } = UserState();
  const { chatList, dispatch, setIsChatListLoading } = ChatState();
  const navigate = useNavigate(); 
  const toast = useToast();



  const handleClick = async (userId) => {
    if (user) {
      const data = await createChat(user, userId);
      if (!chatList.find((c) => c._id === data._id)) {
        dispatch({
          type: chatActions.CREATE_CHAT,
          payload: {
            chatList: [data, ...chatList],
            selectedChat: data,
          },
        });
        console.log(data);
        navigate('/chats');

      } else {
        dispatch({ type: chatActions.SELECT_CHAT, payload: data });
      }
    }
  };
  const handleContributeClick = async () => {
    try{
      const response = await fetch('https://forkfusion.onrender.com/api/projects/addcontributors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({projectId, userId}),
      });
      if(response.ok){
        console.log('Contributor added successfully');
        toast({
          title: 'Contributor added',
          description: 'Contributor added successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error('Error adding contributor');
      toast({
        title: 'Error adding contributor',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }
  return (
    <Box  mb={10} borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    bg="blackAlpha.100"
    p={4} >
      <Flex >
      <HStack spacing={4} p={4} w={'100%'} align={'start'} gap={20}>
        <VStack align={'start'}>
          <Text fontSize={'xl'} as={'b'} fontWeight={'light'} color={'white'}>
            Collaborator
          </Text>
          <Box>
            <Text fontSize={'xl'} fontWeight={'bold'} color={'white'}>
              {myuser.name}
            </Text>
            <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
              @{myuser.username}
            </Text>
          </Box>
          <Box>
            <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
              Skills & Expertise
            </Text>
            {myuser.skillsAndExpertise.map((skill, index) => (
              <Box key={index}>
                <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>
                  {skill.skill}
                </Text>
                <Progress
                  colorScheme="pink"
                  size="xs"
                  h={5}
                  value={skill.expertiseLevel * 20}
                  w={'100%'}
                >
                  <Box textAlign="center" fontSize="xs" fontWeight="bold">
                    {/* Add tick marks for expertise levels */}
                    {[1, 2, 3, 4, 5].map((level) => (
                      <Box key={level} position="relative">
                        {level === skill.expertiseLevel && (
                          <Box
                            position="absolute"
                            top="-20px" // Adjust the positioning as needed
                            left={`${(level - 1) * 20}%`} // Adjust the positioning as needed
                          >
                            {level}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Progress>
              </Box>
            ))}
          </Box>
        </VStack>
        <Center height='100px'>
            <Divider orientation='vertical' h={'100px'} w= {'10'}color={'white'} colorScheme='white'/>
            </Center>
        <VStack align={'start'}>
          <Text fontSize={'xl'} as={'b'} fontWeight={'light'} color={'white'}>
            Project
          </Text>
          <Box>
            <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>
              {project.name}
            </Text>
            <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
              {project.projectId}
            </Text>
          </Box>
          <Box>
            <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
              Skills Required
            </Text>
            {project.skillsRequired.map((requiredSkill, index) => (
              <Box key={index}>
                <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>
                  {requiredSkill.name}
                </Text>
                <Progress
                  colorScheme="green"
                  size="xs"
                  h={5}
                  value={requiredSkill.expertiseLevel * 20}
                  w={'100%'}
                >
                  <Box textAlign="center" fontSize="xs" fontWeight="bold">
                    {/* Add tick marks for expertise levels */}
                    {[1, 2, 3, 4, 5].map((level) => (
                      <Box key={level} position="relative">
                        {level === requiredSkill.expertiseLevel && (
                          <Box
                            position="absolute"
                            top="-20px" // Adjust the positioning as needed
                            left={`${(level - 1) * 20}%`} // Adjust the positioning as needed
                          >
                            {level}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Progress>
              </Box>
            ))}
          </Box>
          <Box>
            <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
              Match Percentage
            </Text>
            <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>
              {matchPercentage}%
            </Text>
          </Box>
        </VStack>
        <VStack>
        <Button leftIcon={<MdBuild />} colorScheme={'pink'} variant='solid'>
            Request to Collaborate
        </Button>
        <Button rightIcon={<MdCall />} colorScheme='green' variant='outline' onClick={() => handleClick(myuser._id)}>
            Message or Chat
        </Button>
        </VStack>
      </HStack>
    </Flex>
    </Box>
  );
};

export default FeedUserCard;
