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
  Button,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';
import { MdBuild , MdCall } from "react-icons/md"
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import {Link} from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const CollabFeed = ({ userSkills, project, matchPercentage }) => {
  const currentUser = useRecoilValue(userAtom);
  const toast = useToast();



  const handleClick = async () => {
    const projectId = project._id;
    const userId = currentUser._id;

    try{
      const response = await fetch('https://forkfusion.onrender.com/api/projects/addcontributors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId, userId }),



    });
    console.log(response);
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
    } catch(error) {
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
    <Box mb={10} borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    bg="blackAlpha.100"
    p={4} >
      <Flex >
      <HStack spacing={4} p={4} w={'100%'} align={'start'} gap={20}>
        <VStack align={'start'}>
          
          <Box>
            <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
              Skills & Expertise
            </Text>
            {userSkills.map((skill, index) => (
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
          <Box>
            {project.contributors.length > 0 && (
              <>
                <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
                  Contributors
                </Text>
                <AvatarGroup size="md" max={3}>
                  {project.contributors.map((contributor) => (
                    <Avatar
                      key={contributor._id}
                      name={contributor.username}
                      src={contributor.pic}
                    />
                  ))}
                </AvatarGroup>
              </>
            )}
          </Box>
          <Box>
            {project.creators.length > 0 && (
              <>
                <Text fontSize={'sm'} fontWeight={'light'} color={'white'}>
                  Creators
                </Text>
                <AvatarGroup size="md" max={3}>
                  {project.creators.map((creator) => (
                    <Avatar
                      key={creator._id}
                      name={creator.username}
                      src={creator.pic}
                    />
                  ))}
                </AvatarGroup>
              </>
            )}
          </Box>
            
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
        <Button leftIcon={<MdBuild />} colorScheme={'pink'} variant='solid' onClick={handleClick}>
            Collaborate
        </Button>
       <Link to={'/project/' + project._id}>
       <Button rightIcon={<MdCall />} colorScheme='green' variant='outline' >
            View project
        </Button>
       </Link>
        </VStack>
      </HStack>
    </Flex>
    </Box>
  );
};

export default CollabFeed;
