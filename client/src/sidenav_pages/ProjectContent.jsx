import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Spinner,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Progress,

} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const ProjectContent = () => {
  const [projects, setProjects] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    link: "",
    status: "",
  });

  useEffect(() => {
    // Simulate loading for 2 seconds (replace with your actual data fetching)
    fetch(`https://forkfusion.onrender.com/api/projects/getprojectforcreator/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.projects) {
          setProjects(data.projects);
          setLoading(false);
          console.log(data.projects);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // Function to calculate completion percentage based on tasks
  const calculateCompletionPercentage = (tasks) => {
    if (!tasks || tasks.length === 0) {
      return 0; // No tasks or undefined tasks, completion is 0%
    }

    const completedTasks = tasks.filter((task) => task.status === 'completed');
    const completionPercentage = (completedTasks.length / tasks.length) * 100;

    return completionPercentage.toFixed(2); // Rounded to 2 decimal places
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };


  // Function to add a task to the selected project
  const addTask = async () => {
    if (!selectedProjectId) {
      console.error('Project ID is missing.');
      return;
    }

    // Create a new task object (modify this as needed)
   

    try {
      const response = await fetch(`https://forkfusion.onrender.com/api/projects/addTask/${selectedProjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      // Handle the response as needed
      if (response.ok) {
        console.log('Task added successfully');
        // Handle redirection to project details or other actions as needed
      } else {
        console.error('Error adding task');
        // Handle error cases
      }

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle network or other errors
    }
  };

  return (
    <Flex flexDir={'column'}>
     
      <Box w="70%" mt={10} borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              bg="blackAlpha.100"
              p={4}>
        <VStack width={'100%'} justifyContent={'space-between'} align={'start'}>
          <HStack align={'center'} justifyContent={'space-between'} ml={10} mr={10} width={'80%'}>
            <VStack align={'start'} mr={20}>
              <Text fontSize="xl" color={'white'} fontWeight={'bold'}>
                Projects
              </Text>
              <Text fontSize="md" color={'white'}>
                30 done this month
              </Text>
            </VStack>
            <BsThreeDotsVertical size={20} color="white" />
          </HStack>
          {loading ? (
            <Spinner size="xl" color="teal" thickness="4px" speed="0.65s" emptyColor="gray.200" />
          ) : (
            projects.length===0 ? <Box><VStack align={'start'}>
              <Text color={'white'} fontSize={'3xl'} mt={3} mb={3} fontWeight={'bold'}>No projects found</Text>
            <Text color={'white'}>Please add more Projects to your profile to find your projects</Text>
            
            <Link to="/create" >
              <Button colorScheme="pink" size="lg" borderRadius="full" mt={5}>
                Create Project
              </Button>
            </Link>
              </VStack></Box> :<Table variant="simple" mt={4} width={'100%'}>
            <Thead>
              <Tr>
                <Th width="40%">Project</Th>
                <Th>Members</Th>
                <Th>Language</Th>
                <Th>Completion</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <Tr key={project.project._id}>
                  <Td color={'white'}>
                    <Link to={`/project/${project.project._id}`}>
                      <Button color={'white'} variant="link">
                        {project.project.name}
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    {project.contributors.length > 0 ? (
                      <VStack align="start">
                        {project.contributors.map((contributor) => (
                          <Box key={contributor._id} display="flex" alignItems="center">
                            <Image src={contributor.profilePicture} boxSize="30px" borderRadius="50%" marginRight="10px" />
                            <Text>{contributor.username}</Text>
                          </Box>
                        ))}
                      </VStack>
                    ) : (
                      <Text color="white">No contributors</Text>
                    )}
                  </Td>
                  {/* Add Language and Completion data as needed */}
                  <Td color={'white'}>Language Data</Td>
                  <Td color={'white'}>
                    {project.project.tasks ? (
                      project.project.tasks.length === 0 ? (
                        <Button colorScheme="teal" variant="outline" onClick={() => {
                          setSelectedProjectId(project.project._id);
                          onOpen(); // Log the project ID
                          // Open the modal
                        }}>
                          Add Task
                        </Button>
                      ) : (
                      
                        <Progress value={calculateCompletionPercentage(project.project.tasks) } colorScheme='green'/>
                      )
                    ) : (
                      'N/A'
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          )}
        </VStack>
      </Box>

      {/* Add Task Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                type="text"
                name="link"
                value={newTask.link}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Input
                type="text"
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addTask}>
              Add Task
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ProjectContent;
