import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  HStack,
  Spinner,
  Flex,
  Button,
  VStack
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import ProfileViewsChart from '../../components/ProfileViewsChart';
import TaskCompletedChart from '../../components/TaskCompletedChart';
import { Link } from 'react-router-dom';

const DashboardContent = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useRecoilValue(userAtom);
  const userId = currentUser._id;
  const data = [
    { dayOfWeek: 'Sun', completedTasks: 5 },
    { dayOfWeek: 'Mon', completedTasks: 8 },
    { dayOfWeek: 'Tue', completedTasks: 6 },
    { dayOfWeek: 'Wed', completedTasks: 10 },
    { dayOfWeek: 'Thu', completedTasks: 7 },
    { dayOfWeek: 'Fri', completedTasks: 9 },
    { dayOfWeek: 'Sat', completedTasks: 4 },
  ];
  const profileViewsData = [
    { dayOfWeek: 'Sun', profileViews: 100 },
    { dayOfWeek: 'Mon', profileViews: 120 },
    { dayOfWeek: 'Tue', profileViews: 90 },
    { dayOfWeek: 'Wed', profileViews: 140 },
    { dayOfWeek: 'Thu', profileViews: 110 },
    { dayOfWeek: 'Fri', profileViews: 130 },
    { dayOfWeek: 'Sat', profileViews: 105 },
  ];

  useEffect(() => {
    // Fetch assigned tasks
    fetch(`https://forkfusion.onrender.com/api/projects/contributortask/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Assigned tasks:', data);
        const { assignedTasks, completedTasks } = data;
        setAssignedTasks(assignedTasks);
        setCompletedTasks(completedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <Box>
      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : (
        <Box>
          
      <VStack>
      <Flex w='100%' >
        <HStack w={'100%'} justifyContent={'space-between'} mr={10} ml={10}>
        <ProfileViewsChart data={profileViewsData}/>
        <TaskCompletedChart data={data}/>
        </HStack>
      </Flex>
      
      
    
        <HStack spacing={8} align={'start'} justify={'flex-start'} w={'100%'} mt={10}>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Assigned Tasks
            </Text>
            {assignedTasks.length === 0 ? (
              <Text>No assigned tasks found. Try contributing to projects.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Task Name</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {assignedTasks.map((task) => (
                    <Tr key={task._id}>
                      <Td>{task.name}</Td>
                      <Td>
                        <Badge colorScheme="yellow">To Do</Badge>
                      </Td>
                      <Td>
                        <Button colorScheme='pink' >Complete Task</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Completed Tasks
            </Text>
            {completedTasks.length === 0 ? (
              <Text>No completed tasks found. Try contributing to projects.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Task Name</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {completedTasks.map((task) => (
                    <Tr key={task._id}>
                      <Td>{task.name}</Td>
                      <Td>
                        <Badge colorScheme="green">{task.status}</Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        </HStack>
      </VStack>
        </Box>
      )}
    </Box>
  );
};

export default DashboardContent;
