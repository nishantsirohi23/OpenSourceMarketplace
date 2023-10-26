import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
  HStack,
  Select,
  useToast
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const CreateProject = () => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const [formData, setFormData] = useState({
    name: '',
    projectId: '',
    description: '',
    skillsRequired: [], // Initialize as an empty array
    timeline: '',
    tags: [], // Initialize as an empty array
    tasks: [], // Initialize as an empty array
    creatorId: currentUser._id, // Set this value based on your authentication system
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://forkfusion.onrender.com/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skillsRequired];
    updatedSkills[index][field] = value;
    setFormData({ ...formData, skillsRequired: updatedSkills });
  };

  const addSkill = () => {
    const updatedSkills = [...formData.skillsRequired, { name: '', expertiseLevel: '' }];
    setFormData({ ...formData, skillsRequired: updatedSkills });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skillsRequired];
    updatedSkills.splice(index, 1);
    setFormData({ ...formData, skillsRequired: updatedSkills });
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData({ ...formData, tags: updatedTags });
  };

  const addTag = () => {
    const updatedTags = [...formData.tags, ''];
    setFormData({ ...formData, tags: updatedTags });
  };

  const removeTag = (index) => {
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks[index][field] = value;
    setFormData({ ...formData, tasks: updatedTasks });
  };

  const addTask = () => {
    const updatedTasks = [...formData.tasks, { name: '', description: '', link: '', status: '' }];
    setFormData({ ...formData, tasks: updatedTasks });
  };

  const removeTask = (index) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks.splice(index, 1);
    setFormData({ ...formData, tasks: updatedTasks });
  };

  return (
    <div>
      <Text color={'white'} fontSize={'3xl'} ml={20} mt={5} mb={5}>
        Create Project
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start" mr={20} ml={20}>
          <FormControl>
            <FormLabel>Project Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Project ID</FormLabel>
            <Input
              type="text"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea height={'250px'} name="description" value={formData.description} onChange={handleChange} required />
          </FormControl>

          {formData.skillsRequired.map((skill, index) => (
            <div key={index}>
              <HStack align={'end'}>
                <FormControl>
                  <FormLabel>Skill Name</FormLabel>
                  <Input
                    type="text"
                    name={`skillName_${index}`}
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Expertise Level</FormLabel>
                  <Select
                    name={`expertiseLevel_${index}`}
                    value={skill.expertiseLevel}
                    onChange={(e) => handleSkillChange(index, 'expertiseLevel', e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1 - Beginner</option>
                    <option value="2">2 - Intermediate</option>
                    <option value="3">3 - Advanced</option>
                    <option value="4">4 - Expert</option>
                    <option value="5">5 - Master</option>
                  </Select>
                </FormControl>
                <Button type="button" width={'100%'} colorScheme='red' onClick={() => removeSkill(index)}>
                  Remove Skill
                </Button>
              </HStack>
            </div>
          ))}

          <Button type="button" colorScheme={'blue'}  onClick={addSkill}>
            Add Skill
          </Button>

          {formData.tags.map((tag, index) => (
            <div key={index}>
              <FormControl>
                <FormLabel>Tag</FormLabel>
                <HStack>
                <Input
                  type="text"
                  name={`tag_${index}`}
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  required
                />
                <Button type="button" colorScheme={'red'} width={'100%'} onClick={() => removeTag(index)}>
                  Remove Tag
                </Button>
                </HStack>
              </FormControl>
            </div>
          ))}

          <Button type="button" colorScheme={'blue'}  onClick={addTag}>
            Add Tag
          </Button>

          {formData.tasks.map((task, index) => (
            <div key={index}>
              <HStack align={'end'}>
                <FormControl>
                  <FormLabel>Task Name</FormLabel>
                  <Input
                    type="text"
                    name={`taskName_${index}`}
                    value={task.name}
                    onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Task Description</FormLabel>
                  <Textarea
                    type="text"
                    name={`taskDescription_${index}`}
                    value={task.description}
                    onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Task Link</FormLabel>
                  <Input
                    type="text"
                    name={`taskLink_${index}`}
                    value={task.link}
                    onChange={(e) => handleTaskChange(index, 'link', e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Task Status</FormLabel>
                  <Input
                    type="text"
                    name={`taskStatus_${index}`}
                    value={task.status}
                    onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
                    required
                  />
                </FormControl>
                <Button type="button" colorScheme={'red'} width={'100%'} onClick={() => removeTask(index)}>
                  Remove Task
                </Button>
              </HStack>
            </div>
          ))}

          <Button type="button" colorScheme='blue' onClick={addTask}>
            Add Task
          </Button>

          <FormControl>
            <FormLabel>Timeline</FormLabel>
            <Input type="text" name="timeline" value={formData.timeline} onChange={handleChange} required />
          </FormControl>

          {/* Add other form fields as needed */}

          <Button type="submit" colorScheme="teal">
            Create Project
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default CreateProject;
