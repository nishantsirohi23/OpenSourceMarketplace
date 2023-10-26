import React from 'react';
import {
  Box,
  Text,
  Spinner,
  Flex,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import CollabFeed from '../components/CollabFeed';

const FeedContent = () => {
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    // Fetch project data from the API
    async function fetchProjectData() {
      try {
        const response = await fetch(`https://forkfusion.onrender.com/api/projects/feed/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(currentUser._id);
          setProjectData(data.userSkillsAndMatch); // Assuming that relevantUsers is an array of project data
          setIsLoading(false);
          console.log(data); // Set isLoading to false when data is fetched
        } else {
          console.error('Failed to fetch project data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    }

    // Call the fetchProjectData function to load project data
    fetchProjectData();
  }, []);

  return (
    <Flex>
      <Box w={'100%'} mt={5}>
        {isLoading ? ( // Show Spinner when isLoading is true
          <Spinner size="xl" color="pink.500" />
        ) : projectData.length === 0 ? (
          <Box borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          bg="blackAlpha.100"
          p={4}>
            <VStack align={'start'}>
            <Text color={'white'} fontSize={'3xl'} mt={3} mb={3} fontWeight={'bold'}>No projects found</Text>
            <Text color={'white'}>Please add more skills to your profile to find relevant Projects</Text>
            
            <Link to="/create" >
              <Button colorScheme="pink" size="lg" borderRadius="full" mt={5}>
                Create Project
              </Button>
            </Link>
            </VStack>
          </Box>
        ) : (
          projectData.map((project, index) => (
            <CollabFeed
              key={index}
              userSkills={project.userSkills}
              project={project.project}
              matchPercentage={project.matchPercentage}
            />
          ))
        )}
      </Box>
    </Flex>
  );
}

export default FeedContent;
