import React, { useEffect, useState } from 'react';
import { Box, Text, Stack, Table, Thead, Tbody, Tr, Th, Td, Button ,Badge, VStack,HStack,Avatar,AvatarBadge,AvatarGroup} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProjectContent = () => {
  const [projects, setProjects] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(true);
  const userId = currentUser._id;
  const toast = useToast();
  const handleTakeTask = async (taskId, projectId) => {
    // Handle taking up the task here (e.g., make an API request)
    console.log(`Taking up task with ID: ${taskId}`);
    try {
      const response = await fetch('https://forkfusion.onrender.com/api/projects/assignTask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, taskId, userId }),
      });

      if (response.ok) {
        console.log('Project created successfully');
        toast({
          title: 'Project created',
          description: 'Project created successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        // Handle redirection to project details or other actions as needed
        // Remove the task from the list of tasks when it's assigned
        
      } else {
        console.error('Error creating project');
        toast({
          title: 'Error creating project',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        // Handle error cases
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error creating project',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      // Handle network or other errors
    }
  };
  const handleCompleteTask = async (projectId,taskId) => {
    // Handle taking up the task here (e.g., make an API request)
    try {
      const response = await fetch('https://forkfusion.onrender.com/api/projects/completeTask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, taskId }),
      });

      if (response.ok) {
        console.log('Project created successfully');
        toast({
          title: 'Project created',
          description: 'Project created successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        // Handle redirection to project details or other actions as needed
        // Remove the task from the list of tasks when it's assigned
        
      } else {
        console.error('Error creating project');
        toast({
          title: 'Error creating project',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        // Handle error cases
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error creating project',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      // Handle network or other errors
    }
  };

  useEffect(() => {
    // Simulate loading for 2 seconds (replace with your actual data fetching)
    fetch(`https://forkfusion.onrender.com/api/projects/getprojectforcollab/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.collaboratorProjects);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  

  return (
    <Box>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack spacing={4}>
          {projects.map((project) => (
            <Box
              key={project._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              bg="blackAlpha.100"
              p={4}
            >
              
              <HStack w={'100%'} justifyContent={'space-between'}>
                <VStack>
                <Link to={'/project/' + project._id}>
                <Text fontWeight="bold">{project.name}</Text>
                </Link>
                <Text>Project ID: {project.projectId}</Text>
                
                </VStack>
                <HStack spacing={10} mr={10}>
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
                </HStack>

                
              </HStack>
              <Text>Tasks:</Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Link</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {project.tasks.map((task, taskIndex) => (
                    <Tr key={task._id}>
                      <Td>{task.name}</Td>
                      <Td>{task.description}</Td>
                      <Td><Text color={'blue.300'}>
              <a href={task.link} target="_blank" rel="noopener noreferrer">
                {task.link}
              </a>
            </Text></Td>
                      <Td>
                          {task.status === 'completed' ? (
                            
                              <Badge colorScheme='green'>{task.status}</Badge>
                             
                          ) : task.status === 'assigned' ? (
                            
                              <Badge colorScheme='yellow'>{task.status}</Badge>
                              
                          ) : (
                            <Badge colorScheme='red'>{task.status}</Badge>
                          )}
                        </Td>
                      <Td>
                        
                        {task.status === 'assigned' && task.assignedUser._id === userId && (
                            <Button colorScheme="pink" onClick={() => handleCompleteTask(project._id, task._id)}>Complete Task</Button>
                    
                        )}
                        {task.status !== 'assigned'&& task.status !== 'completed' && (
                            <Button colorScheme="pink" onClick={() => handleTakeTask(task._id, project._id, taskIndex)}>Take Task</Button>

                        )}
                        {task.status === 'assigned' && task.assignedUser._id !== userId && (
                            <VStack>
                            <Text color={'white'}>Assigned To</Text>
                            <Link to={'/user/' + task.assignedUser._id}>
                            <Text color={'white'} style={{ textDecoration: 'underline' }}>{task.assignedUser.username}</Text>
                            </Link>
                            </VStack>
                           
                            
                        )}
                        {task.status === 'completed' && (
                           <VStack>
                           <Text color={'white'}>Completed By</Text>
                           <Link to={'/user/' + task.assignedUser._id}>
                           <Text color={'white'} style={{ textDecoration: 'underline' }}>{task.assignedUser.username}</Text>
                           </Link>
                           </VStack>
                        
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ProjectContent;
