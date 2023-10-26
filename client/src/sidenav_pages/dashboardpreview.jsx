import React from 'react';
import { Text, Button, Box, HStack ,Flex} from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // You'll need React Router for navigation
import ProfileViewsChart from '../components/ProfileViewsChart';
import TaskCompletedChart from '../components/TaskCompletedChart';
const Dashboard = () => {
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
  return (
    <div>
      <Flex w='100%' >
        <HStack w={'100%'} justifyContent={'space-between'} mr={10} ml={10}>
        <ProfileViewsChart data={profileViewsData}/>
        <TaskCompletedChart data={data}/>
        </HStack>
      </Flex>
      
      <Box position="fixed" bottom="20px" right="20px">
        <Link to="/create">
          <Button colorScheme="pink" size="lg" borderRadius="full">
            Create Project
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Dashboard;
