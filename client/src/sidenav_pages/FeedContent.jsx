import React, { useState, useEffect } from 'react';
import FeedUserCard from '../components/FeedUserCard';
import {
  Box,
  Text,
  VStack,
  HStack,
  Progress,
  Button,
  Flex,
  Spinner, // Import the Spinner component
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';


const FeedContent = () => {
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const currentUser = useRecoilValue(userAtom);
  const toast = useToast();
  const userId = currentUser._id;


  useEffect(() => {
    // Fetch project data from the API
    async function fetchProjectData() {
      try {
        const response = await fetch(`https://forkfusion.onrender.com/api/projects/collabfeed/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProjectData(data.relevantUsers); // Assuming that relevantUsers is an array of project data
          setIsLoading(false);
          console.log(data.relevantUsers); // Set isLoading to false when data is fetched
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
        ) : (
          projectData.length===0 ? <Box><VStack align={'start'}>
            <Text color={'white'} fontSize={'3xl'} mt={3} mb={3} fontWeight={'bold'}>No Contributors found</Text>
            <Text color={'white'}>Please add more Projects to your profile to find relevant Collaborators</Text>
            
            <Link to="/create" >
              <Button colorScheme="pink" size="lg" borderRadius="full" mt={5}>
                Create Project
              </Button>
            </Link>
            </VStack></Box> :
          projectData.length > 0 &&
          projectData.map((project, index) => (
            <FeedUserCard
            key={index}
            myuser={project.user}
            project={project.project}
            matchPercentage={project.matchPercentage}

          />
          
          ))
        )}
      </Box>
    </Flex>
  );
};

export default FeedContent;
