import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Box,
  Spacer,
    Text,
    Progress,

} from '@chakra-ui/react';
import userAtom from '../atoms/userAtom';

const UpdatePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    profilePicture: '',
    bio: '',
    location: '',
    availability: '',
    researchInterests: [],
    skillsAndExpertise: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useRecoilValue(userAtom);
  const handleDeleteSkill = (index) => {
    const updatedSkills = [...formData.skillsAndExpertise];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skillsAndExpertise: updatedSkills,
    });
  };

  const handleAddSkill = () => {
    const newSkillObj = {
      skill: formData.newSkill,
      expertiseLevel: formData.newExpertiseLevel,
    };
    setFormData({
      ...formData,
      skillsAndExpertise: [...formData.skillsAndExpertise, newSkillObj],
      newSkill: '', // Clear the input field
      newExpertiseLevel: 1, // Reset expertise level to default
    });
  };


  useEffect(() => {
    // Fetch the user details using the userId
    async function fetchUser() {
        try {
          const response = await fetch(`https://forkfusion.onrender.com/api/users/get/${currentUser._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            // Update the formData state with the fetched user data
            setFormData({
              username: data.user.username,
              email: data.user.email,
              password: '', // Exclude password for security reasons
              name: data.user.name,
              profilePicture: data.user.profilePicture,
              bio: data.user.bio,
              location: data.user.location,
              availability: data.user.availability,
              researchInterests: data.user.researchInterests,
              skillsAndExpertise: data.user.skillsAndExpertise, // Make sure it's an array
            });
            setIsLoading(false);
          } else {
            console.error('Failed to fetch user:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }

    // Call the fetchUser function to load user data
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const response = await fetch(`https://forkfusion.onrender.com/api/users/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify(formData), // Convert formData to JSON
      });
  
      if (response.ok) {
        // Handle a successful response here, e.g., show a success message
        console.log('Form data submitted successfully');
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to submit form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Update Page</h1>
          <form onSubmit={handleSubmit}>
            {/* Render form fields with their respective values from formData */}
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormHelperText>Leave blank to keep the current password.</FormHelperText>
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="profilePicture">
              <FormLabel>Profile Picture</FormLabel>
              <Input
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="bio">
              <FormLabel>Bio</FormLabel>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="location">
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="availability">
              <FormLabel>Availability</FormLabel>
              <Input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="researchInterests">
              <FormLabel>Research Interests</FormLabel>
              <Input
                type="text"
                name="researchInterests"
                value={formData.researchInterests}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="newSkill">
              <FormLabel>New Skill</FormLabel>
              <Input
                type="text"
                name="newSkill"
                value={formData.newSkill}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="newExpertiseLevel">
              <FormLabel>Expertise Level</FormLabel>
              <Input
                type="number"
                name="newExpertiseLevel"
                value={formData.newExpertiseLevel}
                onChange={handleChange}
                min={1}
                max={5}
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleAddSkill}>
              Add Skill
            </Button>
            {formData.skillsAndExpertise.map((skill, index) => (
              <Box key={index} mb={4}>
                <Flex align="center">
                  <Text fontSize="md" fontWeight="bold" color="white">
                    {skill.skill}
                  </Text>
                  <Spacer />
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteSkill(index)}
                  >
                    Delete
                  </Button>
                </Flex>
                <Progress
                  colorScheme="pink"
                  size="xs"
                  h={5}
                  value={skill.expertiseLevel * 20}
                  w="100%"
                >
                  {/* ... Progress bar */}
                </Progress>
              </Box>
            ))}
            <Button mt={4} colorScheme="teal" type="submit">
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePage;
