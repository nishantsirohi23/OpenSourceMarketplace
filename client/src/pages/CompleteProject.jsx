import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Progress,
  HStack,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  VStack,
  Badge,
  Tag,
  Avatar,
  TagLabel,
  Button,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom  from '../atoms/userAtom';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const CompleteProject = () => {
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const projectId = useParams().id;
  const currentUser = useRecoilValue(userAtom);
  const userId = currentUser._id;
  const toast = useToast();

  useEffect(() => {
    // Fetch project data from the API
    fetch(`https://forkfusion.onrender.com/api/projects/${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        setProjectData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching project data:', error);
        setLoading(false);
      });
  }, []);

  const handleCreatorClick = (creator) => {
    setSelectedCreator(creator);
  };
  const handleContributeClick = async () => {
    console.log(projectId, userId);
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
    <div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box ml={5} mr={5} mb={10}>
          <Text color={'white'} fontSize={'3xl'} mt={3} mb={3} fontWeight={'bold'}>{projectData.name}</Text>
          <Text color={'white'}>
            {projectData.description.split('\n').map((text, index) => (
              <React.Fragment key={index}>
                {text}
                <br />
              </React.Fragment>
            ))}
          </Text>
          <HStack mt={5} align={'center'}>
            <Text color={'white'} fontSize={'lg'} fontWeight={'bold'} >Project ID:</Text>
            <Text color={'white'}>{projectData.projectId}</Text>
          </HStack>
          <Text mt={10} color={'white'} fontSize={'lg'} fontWeight={'bold'} >Project Skills:</Text>
          {projectData.skillsRequired.map((skill, index) => (
            <Box key={index}>
              <Text fontSize={'md'} fontWeight={'bold'} color={'white'}>
                {skill.name}
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
          <HStack mt={5}>
            <Text color={'white'} fontSize={'lg'} >Project Timeline:</Text>
            <Text color={'white'}>{projectData.timeline}</Text>
          </HStack>
          <HStack mt={5}>
            <Text color={'white'} fontSize={'lg'} >Project Created:</Text>
            <Text color={'white'}>{projectData.createdDate}</Text>
          </HStack>
          <HStack mt={5} align={'center'} >
            <Text color={'white'} fontSize={'lg'} >Project Creators:</Text>
            {projectData.creators.map((creator) => (
              <Popover
                key={creator._id}
                placement="top"
                isOpen={selectedCreator === creator}
                onClose={() => setSelectedCreator(null)}
              >
                <PopoverTrigger>
                  <Image
                    src={creator.pic}
                    boxSize="50px"
                    borderRadius="full"
                    alt={creator.username}
                    onClick={() => handleCreatorClick(creator)}
                    cursor="pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>{creator.username}</PopoverHeader>
                  <PopoverBody>
                    <VStack align="start">
                    <Link to={'/user/' + creator._id}>
                      <Button colorScheme='pink'>Visit User Profile</Button>
                    </Link>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ))}
          </HStack>
          <HStack mt={8} align={'center'}>
            <Text color={'white'} fontSize={'lg'} >Project Contributors:</Text>

            {projectData.contributors.map((creator) => (
              <Popover
                key={creator._id}
                placement="top"
                isOpen={selectedCreator === creator}
                onClose={() => setSelectedCreator(null)}
              >
                <PopoverTrigger>
                  <Image
                    src={creator.pic}
                    boxSize="50px"
                    borderRadius="full"
                    alt={creator.username}
                    onClick={() => handleCreatorClick(creator)}
                    cursor="pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>{creator.username}</PopoverHeader>
                  <PopoverBody>
                    <VStack align="start">
                    <Link to={'/user/' + creator._id}>
                      <Button colorScheme='pink'>Visit User Profile</Button>
                    </Link>

                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ))}
          </HStack>
          <Box>
            <Text color={'white'} fontSize={'lg'} mt={5} mb={2}>Tags</Text>
          {projectData.tags.map((tag, index) => (
            <Tag size='lg' colorScheme='red' borderRadius='full' mr={2}>
            <Avatar
              src='https://bit.ly/sage-adebayo'
              size='xs'
              name={tag}
              ml={-1}
              mr={2}
            />
            <TagLabel>{tag}</TagLabel>
          </Tag>
          ))}
          </Box>
          <Box mt={12}>
          {projectData.creators.some((creator) => creator._id === userId) ? (
              <Box
                position="fixed"
                bottom="20px"
                right="20px"
                zIndex="1"
                borderRadius="full"
                bg="teal.500"
                p="10px"
                cursor="pointer"
                onClick={() => {
                  // Handle the edit action here, such as navigation to the edit page
                }}
              >
                <Text color="white">Edit</Text>
              </Box>
            ) : (
              (projectData.contributors.length === 0 || !projectData.contributors.every((Contributor) => Contributor._id === userId)) && (
                <Box
                  position="fixed"
                  bottom="20px"
                  right="20px"
                  zIndex="1"
                  borderRadius="full"
                  bg="teal.500"
                  p="10px"
                  cursor="pointer"
                  onClick={handleContributeClick}
                >
                  <Text color="white">Contribute</Text>
                </Box>
              )
            )}


            <Text color={'white'} fontSize={'lg'} fontWeight={'bold'}>
              Tasks
            </Text>
            <div className="table-container">
  <table className="task-table">
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Description</th>
        <th>Link</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {projectData.tasks.map((task, index) => (
        <tr key={index}>
          <td>{task.name}</td>
          <td>{task.description}</td>
          <td>
            <Text color={'blue.300'}>
              <a href={task.link} target="_blank" rel="noopener noreferrer">
                {task.link}
              </a>
            </Text>
          </td>
          <td>
            {task.status === 'completed' ? (
              <Box>
                <VStack>
                <Badge colorScheme='green'>{task.status}</Badge>
        
                  <HStack>
                  <Text color={'white'}>Completed by </Text>
                  <Link to={'/user/' + task.assignedTo._id}>
                  <Text color={'white'} style={{ textDecoration: 'underline' }}>{task.assignedTo.username}</Text>
                  </Link>
                  </HStack>
                
                </VStack>
              </Box>
            ) : task.status === 'assigned' ? (
              <Box>
                <VStack>
                <Badge colorScheme='yellow'>{task.status}</Badge>
                <HStack>
                  <Text color={'white'}>Assigned To</Text>
                  <Link to={'/user/' + task.assignedTo._id}>
                  <Text color={'white'} style={{ textDecoration: 'underline' }}>{task.assignedTo.username}</Text>
                  </Link>
                  </HStack>

                </VStack>
              </Box>
            ) : (
              <Badge colorScheme='red'>{task.status}</Badge>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </Box>
         
        </Box>
      )}
    </div>
  );
};

export default CompleteProject;
