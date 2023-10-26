import React from 'react';
import { Box, Image, Text, Button, Flex } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProjectCard = ({
  imageUrl,
  projectName,
  projectLabel,
  projectDescription,
  avatarImages,
  projectId // Pass an array of avatar image URLs as a prop
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      p={4}
      maxW="300px"
    >
      <Image src={imageUrl} alt={projectName} h="200px" w="100%" objectFit="cover" />
      <Text fontWeight="bold" fontSize="xl" mt={2} color={'black'}>
        {projectName}
      </Text>
      <Text color="gray.600" fontSize="sm">
        {projectLabel}
      </Text>
      <Text mt={2} fontSize="md" color="gray.700" noOfLines={6} >
        {projectDescription}
      </Text>
      <Flex justify="space-between" alignItems="center" mt={4}>
     
        <Link to={'/project/' + projectId}>
        <Button
          colorScheme="pink"
          variant="outline"
          
        >
          View Project
        </Button>
        </Link>
       
        {avatarImages && avatarImages.length > 0 && (
          <AvatarGroup size='md' max={2}>
            {avatarImages.map((avatar, index) => (
              <Avatar key={index} name={`Avatar ${index + 1}`} src={avatar} />
            ))}
          </AvatarGroup>
        )}
      </Flex>
    </Box>
  );
};

export default ProjectCard;
