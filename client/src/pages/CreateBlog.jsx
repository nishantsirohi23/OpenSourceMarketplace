import { useState } from 'react';
import {
    Textarea,
    Text,
    FormControl,
    Container,
    Flex,
    Input,
    FormLabel,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Checkbox,
    CheckboxGroup,
    Grid,
    ButtonGroup,
    GridItem,
} from '@chakra-ui/react';
import { BsFillImageFill } from 'react-icons/bs';

const CustomCategoryButton = ({ category, isSelected, onChange }) => {
    

    return (
        <Button
            onClick={() => onChange(!isSelected)}
            colorScheme={isSelected ? 'teal' : undefined}
            variant={isSelected ? 'solid' : 'outline'}
            rounded="full"
            background={isSelected ? 'linear-gradient(90deg, #FF8A00 0%, #E63B2E 100%)' : 'none'}
            color={isSelected ? 'white' : 'teal'}
            _hover={{
                background: 'linear-gradient(90deg, #FF8A00 0%, #E63B2E 100%)',
                color: 'white',
            }}
        >
            {category}
        </Button>
    );
};

const CreateBlog = () => {
    const [inputs,setInputs] = useState({
        title: "",
        description: "",
        text: "",
        category: [],
        postedBy: "6507463b2068e78a30de2549",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = ['Science', 'Technology', 'Machine Learning', 'English', 'Mathematics', 'Physics', 'Chemistry'];

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryChange = (selected) => {
        setSelectedCategories(selected);
    };
    const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const res = await fetch('https://forkfusion.onrender.com/api/blogs/createblog', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
                    postedBy: inputs.postedBy,
                    text: inputs.text,
                    category : selectedCategories,
                    title: inputs.title,
                    description: inputs.description,

                    
                }),
			});
			const data = await res.json(); // updated user object
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			
			console.log(data);
		} catch (error) {
            console.log(error);
		} 
	};

    

    return (
        <Container maxW="1220px">
            <Flex justifyContent={'center'} align={'center'} padding={10}>
                <FormControl>
                    <Text fontSize="3xl" fontWeight="bold" mb={6}>
                        Create Blog
                    </Text>

                    <FormLabel fontSize="lg">Title</FormLabel>
                    <Input placeholder="Title goes here ..." size="lg" mb={6} 
                    	onChange={(e) => setInputs({ ...inputs, title: e.target.value })}

                    />

                    <FormLabel fontSize="lg">Description</FormLabel>
                    <Textarea placeholder="Description goes here ..." size="lg" height={100} mb={6} 
                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                    />

                    <FormLabel fontSize="lg">Categories</FormLabel>
                    <Button onClick={toggleModal} colorScheme="teal" variant="outline" mb={4}>
                        Choose Categories
                    </Button>

                    <Modal isOpen={isOpen} onClose={toggleModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Choose Categories</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <CheckboxGroup onChange={handleCategoryChange} value={selectedCategories}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                                        {categories.map((category) => (
                                            <GridItem key={category}>
                                                <CustomCategoryButton
                                                    category={category}
                                                    isSelected={selectedCategories.includes(category)}
                                                    onChange={(isSelected) => {
                                                        if (isSelected) {
                                                            setSelectedCategories([...selectedCategories, category]);
                                                        } else {
                                                            setSelectedCategories(selectedCategories.filter((c) => c !== category));
                                                        }
                                                    }}
                                                />
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </CheckboxGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="teal" onClick={toggleModal}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    

                    {/* You can display the selected categories here */}
                    {selectedCategories.length > 0 && (
                        <Text fontSize="md" mt={2}>
                            Selected Categories: {selectedCategories.join(', ')}
                        </Text>
                    )}
                    <FormLabel fontSize="lg" mt={6}>Content</FormLabel>
                    <Textarea placeholder="Content goes here ..." size="lg" height={300} mb={6} 
                    onChange={(e) => setInputs({ ...inputs, text: e.target.value })}
                    />

                    <ButtonGroup variant='outline' spacing='6'>
                        <Button colorScheme='blue' onClick={handleSubmit}>Save</Button>
                        <Button>Cancel</Button>
                    </ButtonGroup>
                </FormControl>
            </Flex>
        </Container>
    );
};

export default CreateBlog;
