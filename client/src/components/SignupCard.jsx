'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import { useToast } from '@chakra-ui/react'
import authScreenAtom from '../atoms/authAtom';
import userAtom from '../atoms/userAtom';


export default function SignupCard() {
    const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [inputs,setInputs] = useState({
    name: "",
    username: "",
    email: "",  
    password: "",
    type: ""
    });


  const handleSignup = async () => {
    try{
        const res = await fetch('https://forkfusion.onrender.com/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        });
        const data = await res.json();
        const token = data.token;
        localStorage.setItem('token', token);
        if(data.error){
            toast({
                title: data.error,
                status: 'error',    
                duration: 9000,
                isClosable: true,
              });
              return;
        }
        toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          console.log(data);
        localStorage.setItem("user-threads",JSON.stringify(data));
        setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" 
                  onChange={(e) => setInputs({...inputs,name:e.target.value})}
                  value={inputs.name}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" 
                  onChange={(e) => setInputs({...inputs,username:e.target.value})}
                  value={inputs.username}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
              onChange={(e) => setInputs({...inputs,email:e.target.value})}
              value={inputs.email}/>
            </FormControl>
            <FormControl id="type" isRequired>
              <FormLabel>Creator or Collaborator:</FormLabel>
              <Input type="text" 
              onChange={(e) => setInputs({...inputs,type:e.target.value})}
              value={inputs.type}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} 
                onChange={(e) => setInputs({...inputs,password:e.target.value})}
                value={inputs.password}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('gray.600', 'gray.700')}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignup}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}
                onClick={() => setAuthScreen("login")}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}