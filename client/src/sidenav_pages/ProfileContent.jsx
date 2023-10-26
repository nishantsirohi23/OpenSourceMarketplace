import React from 'react';
import { useState ,useEffect} from 'react';
import { Flex ,Box,Image,Stack, VStack, HStack,Text,Switch,IconButton,Grid,Spinner} from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import ChatCard from '../components/ChatCard';
import ProjectCard from '../components/ProjectCard';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProfileViewsChart from '../components/ProfileViewsChart';
import TaskCompletedChart from '../components/TaskCompletedChart';
const Profile = () => {
  
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

  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useRecoilValue(userAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();



  useEffect(() => {
    // Fetch the user details using the userId
    async function fetchUser() {
      try {
        const response = await fetch(`https://forkfusion.onrender.com/api/users/get/${currentUser._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    // Call the fetchUser function to load user data
    fetchUser();
  }, [currentUser._id]);

  useEffect(() => {
    // Log the user object when it's available
    if (user !== null) {
      console.log("user", user);
    }
  }, [user]);
  

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  const handleClick = () => {
    // Handle the click event here
    console.log('IconButton clicked');
  };
  return (
    <div>
      {isLoading ? ( // Conditionally render the loading spinner
        <Spinner size="xl" color="pink.500" thickness="4px" speed="0.65s" emptyColor="gray.200" position={'fixed'} />
      ) : (
        // Render your content when data is available
        <Box>
          
      <Flex justify={"center"}>
        
      <Box borderWidth="0.5px" borderRadius="xl" overflow="hidden" position={"relative"}  w={['100vh', '100%', '100%']}>
      <Image
        src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2956&q=80" // Replace with your image URL
        alt="Your Image"
        h="280px"
        w={'100%'} // Allow the height to adjust proportionally
      />
      </Box>
      <Box bg={'white'}  w={['100%', '100%', '75%']} height="auto" position={"absolute"}  borderRadius="xl" marginTop={'25vh'} justifyContent={"space-between"}>
        <VStack  align={"flex-start"} padding={5} spacing={7}>
          <HStack>
          <Image
            borderRadius='full'
            boxSize='100px'
            src={user ? user.user.pic : ""}
            alt='Dan Abramov'
          />
          <VStack align={'flex-start'}>
            <Text as='b' color={'black'} fontSize={'xl'}>{user ? user.user.name : ""}</Text>
            <Text color={'black'} fontSize={'md'}>CE0/founder</Text>
          </VStack>

          </HStack>

          <Box w={"100%"}> 
          <Flex flexDirection={'row'} justifyContent={'start'}  gap={5}
          alignItems={'start'} width={['100%', '100%', '90%']} flexDir={['column', 'column', 'row']}
          >
            <Box  w={['90%', '70%', '100%']}>
              <VStack align={'flex-start'}>
                <Text fontWeight={'medium'} color={'black'} fontSize={'xl'}>Platform Settings</Text>
                <Text fontWeight={'medium'} color={'gray.700'} fontSize={'md'}>Account</Text>
                <HStack align={'flex-start'} alignItems={'center'}>
                <Switch
                    colorScheme="pink"
                    size="md"
                    isChecked={isChecked}
                    onChange={handleChange}
                    checkedTrackColor="pink.500"
                  />
                  <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>Open for contributions</Text>
                </HStack>
                <HStack align={'flex-start'} alignItems={'center'}>
                <Switch
                      colorScheme="pink"
                    size="md"
                    
                    trackColor={{ base: 'pink.300', checked: 'pink.500', false: 'gray.200' }}
                    checkedTrackColor="pink.500"
                  />
                  <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>Open for Project Creator</Text>
                </HStack>
                <HStack align={'flex-start'} alignItems={'center'}>
                <Switch
                      colorScheme="pink"
                    size="md"
                    
                    trackColor={{ base: 'pink.300', checked: 'pink.500', false: 'gray.200' }}
                    checkedTrackColor="pink.500"
                  />
                  <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>Open for Research Projects</Text>
                </HStack>
                <Text fontWeight={'medium'} color={'gray.700'} fontSize={'md'}>Applications</Text>
                <HStack align={'flex-start'} alignItems={'center'}>
                <Switch
                      colorScheme="pink"
                    size="md"
                    trackColor={{ base: 'pink.300', checked: 'pink.500', false: 'gray.200' }}
                    checkedTrackColor="pink.500"
                  />
                  <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>Open for contributions</Text>
                </HStack>
                <HStack align={'flex-start'} alignItems={'center'}>
                <Switch
                      colorScheme="pink"
                    size="md"

                    trackColor={{ base: 'pink.300', checked: 'pink.500', false: 'gray.200' }}
                    checkedTrackColor="pink.500"
                  />
                  <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>Open for contributions</Text>
                </HStack>
                <HStack align={'flex-start'} alignItems={'center'}>
                <Switch
                      colorScheme="pink"
                    size="md"
                    trackColor={{ base: 'pink.300', checked: 'pink.500', false: 'gray.200' }}
                    checkedTrackColor="pink.500"
                  />
                  <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>Open for contributions</Text>
                </HStack>
              </VStack>
            </Box>
            <Box  w={['90%', '70%', '100%']}>
              <VStack align={'flex-start'}>
                <HStack justifyContent={"space-between"} align={"center"}>
               
                  <Text fontWeight={'medium'} color={'black'} fontSize={'xl'}>Profile Information</Text>
                <Link to="/update" >
                <div onClick={handleClick}>
                <IconButton
                  aria-label="My Button"
                  icon={<Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAilBMVEX///8AAACtra20tLSwsLC5ubnu7u6Wlpb09PSqqqq7u7t8fHz7+/vNzc2jo6O/v7/h4eHU1NTa2tpycnLo6OjMzMyHh4fFxcWNjY1eXl6bm5tWVlZKSkqgoKBAQEAhISGBgYFtbW0qKipHR0c2NjZubm4QEBAaGholJSULCws5OTlQUFBlZWUdHR2Dcc/6AAAKa0lEQVR4nN2daUNaOxCGPe4IIiBltRTUSnH5/3/verBWxbwzk8zMSbjv17YhT5OTZbYcHDhqOG5Nrud3tw+vul1M25PWeOj5eyXo9GK0qIK6G12d5+6dlwZnt2Hody1mvdx9tFdvsqGp3/QyO83dU1NdgAke0vxH7t6aqSun3urXUe4emygWe6vj3L1W6yIFux71ce6eqzSM+LZ3Nd/jZe4sHbtWK3f/EzW813FX1c1enmlOtNi19nBra1twV9VZbo5Y3dlwV9U0N0mUztdW3FV138lNI9fQDvtVD3uzxNlyv2pPyM25q81ekJ+bc1fVeh++818O4NVjbipeNx7ce7CrGZ1bvqvwk0zqLVSgy9xslE6lFDfXk1mr1Z1NruVHvJKXdtF9rH3y1Yw+PLoWgc8zQQk043u/HAT/ZV/CXqw9ij25bAjTQkdgmyt1snM72SHz71n050YwonVF93rJt9DhJnzfmyFJD1SXN+Fve1c/aPB7Z4Qktageiw9enSeS/MqTIFFUf2cR7Yyohn65dT9Z1IDHuYTINa68ISecobGdPSTAi/vKiSU93gX4kyAvbWHHe/gkoTXijrcy77pK+NCWdsImfG5lGWOwlyytPcJ+VZZH7QV1M/WTxGvGwrTjSvVQL6+Tm5xC8pKuKvA+mv5BYpsGd9dpUmgtijmx7Qqe4AqyO3ZQHzWN4vXNqtt6jUEPdZZRuJnLLnpNaAJ6qFuG4IrZNeq2XuAqqf0Y0cpRzuENdPBC2Sy68BVzN0U7j/ZwCXc0k14b6DLcvSd1wyjauZQg5+Nw9/TeLrSVlxL1CG4o+lAtFDFWytkNbLj6kEy0oZXiOQX3CX3D6ETY1jdtorDD08I6BsBL8aiEfaQWzk3gfS3FbxredX4btAyOhDcGTVsoHO6TboP4EFg97gyattCfpsFLGfHwl2gBPg+Dl/KNh29RFoaSxzB4Kat6eFwsYvLC3MXs48Cdb9AyAE9xzngIGGD0ZmDknynFBAMMBnr3HrLlleIrBv3Tjwuy5ZVibQQzUr/2oqjHYnwpoH/aZtHlbGPRZxMBc6jWEoHsEOW4UpbhDmrPbshvGOuY6ndH7VHXI5QCDY2uVehDigvg/oglst8FkR1Y58OHwQYxZuve5wy4B/PtAOShrFWNIu6YS+nuTmt9AkB24BNFmzDcLeIT/x5XofXu7Ai4FFQbD+KOcCeE4kk0YxHRy/TIALBTxHjOwnE0tuSwm6nGdegjlhvVUfyQKXkfdTP1Vh42Z9WS1oXCcVOm5LCjaXdnHLEvXdOptAFLchy8nLKDEGG8wubodAnLCjv4V+JPDVSegqwFJk3Ekhzdnat4d/aA6LHs2MknPNqRU9nTceRwoawlakGS6GlHTqVUxFwryFn6U9KCLMHVjBxG+dWSX4yIT6aSDbi0AI0ZOZlgOZVdqc7ppD1JX+WFd8xSNukaKJLNk8pGqWQu95iCQ1bkTLbcHbev9blkZMEieRTBbUe+Yn5nSqH36VS7V42suc3IyfVtqwX4SjuHfOr5iz23WQAVupd/1vR495rRawF38FfxEz2e24yczI/80HzUGvcHg8HlVWvEzvC/4nfEFG6z5B6zql674v0yIMCSlQ05/5mn6daN24rcvtLTVqy7LJ3bipy8Y6SKXdiYow8jG3Lk1VaIdf9w3FxBIhty8/I/7OWO4z5mT7I27iXjMWfHm6zSUL2dzxohv2IKqceJNV1x3G+nRXfyc2X93R2tWcu8jJsnFxk5oE6N65rxiS1Sbp5cYXUerox438Vb5eXc/Kqb6vY5lVXpihBvq4vhZsnTwpU6wguKXM+8uYorD7U7exl7e8qQc//18RIkWcVyc+TxK3sfO/kSJXGKctyhKACSPDZrtbOyA37TtSSGL4WbJo/07ZofUX+LXMFUmZxaKOqD+CijgnY6uIxFmiayJSaVm7o3x6SMMTblWD1Jo3M4buROJu0FETGTMAYkRfNDcXguVxcziVseZnKufh/inx4n44jAvVRuHFqzldSVbzPNH58nR5HBA07c0qJCadew22n7rHUyvuwPBr3eMCn03IlbOuDPscjrVdfkLTvuPxwd+ThuWZxSB+SEAS0mP6zyCry4Zcmwp6J32/6qHbNu5eKWHVe5Vj5T20bI5x1vse18al3HIi+3xCla68z85a683LLte+1QuyOVm4qcqyXLnhGN99o4LnwrOiIKpz3ZcIu+b5fnGPNyS9ZzTeE+rLzcguchVj4ZkHm5O2QR9Vprp2c98nKj2gUfWhpx7orjRv/dHLew+MCK4/YqCZ2Zm7sOumW7ZubmDi5uFQxSubmdV8jNPWTmlsfP+abQ92XEzbz3c++Wxp+bm/59v5o0ubnpE7ogsDhRXtxL4e/TEYs+Z9Raublpy6JfQRrOX4G4uRvkUtoBMoDrf8xNPnujixaixHGjDdSOmwpu8as45cUtX4mpk59fibFUbu6AGbEDEUcXv2J6XMBcA9xEKDgfP5+qAriplc3tnMrZUxE3Fz8cw030we1FJm59aoKbuJT5bWTMi/UoYYHjjtqB8Mfmt7AxAYiNcBMD7vcOFe16b4SbGHDHuvYFcOMBtygqDUQGljfDTZi71HhYVMgg4ubqgERy42u4cZks2Y82xo3jZPVvgWARMz2VO/rVBRjp4vlUCZ7pjXHDBWOpIqOFZ3pj3Ki+ue9TkjAKvDlu6BN2fagEzXTEzYXLJ3QW+spUYIxiH0fhuFMswKD4pqM1+QCv6cAB7sENLU6uj8WimR7+21z2YNIYIWO+a0H7uJnuwg03cdcq36i0R3Cmc3VA0rjRTPd9UjBmpnPciYYSdD9xfQE8ZqY7caOH9XyfUkQwgaAHL250evEztNVCZ8Xvf9OLG1rTzSOSP0s+07m6L+mezFW4Qd8HmMQznasDovDgghZ9H3yXznRHbhSsW8BM7824qiMajz34hixeKsQSzPTeGZ+qropUAGZl1/sJO9Ml1NoIDTCbXE8vyJa93P6pjFq7CqGvTU9HCM30vpxavfqCcCnfR/XATN8MxdT6XQesba6fOBcs2wQ3uos7pR+8Ka3YpC03mnWuthdRkVJSBqluYSOE7qkbRvqZbpHiF27Z9cEtTblJM25QQ8LVnq6d6SZ1lEHwTfv4MElHgkoB2pluUz/avJhPdcstuMqZblQ3275WV8U99SetwRyWVTIrl/eTJur4o5vpZkm8xpUX30XYwVSldO2Sl1c2oN+EL3eamW6YtG1dsetdf9APama69pnQz3Irk46C49LX9N+mHi3wBKteyP+UONPvfxrbAE1rCH8R+MGUph67FgWUvurFmvefwiMUUVDnrxZdF3svEzatUDiSJbIavRP1gedUD89OLtG7GeoDC5sAUtiUId7NFi1Xj4bTkbXCDglRsbA7Z+oDeTWnaKEbPV/08safupbXso46z7wyctNyDbz5JC5MMlFL+INEFmdz1LWiKzJKRBkrEbW8VquRPE6t1FcamuxPx01T1zIfc6Z+xnAngjQPda2x7QrHe28/5TTOs1FvdTl5YqtaSbRZtGVvCl+07x6q++ujXNT/AbekmXVJmtdbAAAAAElFTkSuQmCC" alt="Button Icon" boxSize="20px" />}
                  variant="ghost"
                   // You can choose the button variant that suits your design
                /> 
                </div>
                </Link>
                </HStack>
                <Text
                    noOfLines={5}
                    color={'gray.500'} // Prevent text from wrapping
                  >
                    {user ? user.user.bio : ""}
                  </Text>
                <HStack>
                <Text fontWeight={'medium'} color={'gray.700'} fontSize={'md'}>Full Name: </Text>
                <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>{user ? user.user.name : ""}</Text>
                </HStack>
                <HStack>
                <Text fontWeight={'medium'} color={'gray.700'} fontSize={'md'}>mobile: </Text>
                <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>(44) 87 48 383434</Text>
                </HStack>
                <HStack>
                <Text fontWeight={'medium'} color={'gray.700'} fontSize={'md'}>Email: </Text>
                <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>{user ? user.user.email : ""}</Text>
                </HStack>
                <HStack>
                <Text fontWeight={'medium'} color={'gray.700'} fontSize={'md'}>Location: </Text>
                <Text fontWeight={'medium'} color={'gray.500'} fontSize={'md'}>{user ? user.user.location : ""}</Text>
                </HStack>
                <HStack alignItems={'center'}>
                <Text fontWeight={'medium'} color={'gray.700'} fontSize={'md'}>Social: </Text>
                <FaFacebook size={20} color='pink' />
                <FaInstagram size={20} color='pink'/>
                <FaTwitter size={20} color='pink'/>
                </HStack>
              </VStack>

            </Box>
            <Box  w={['90%', '70%', '100%']}>
              <VStack align={'flex-start'}>
              <Text fontWeight={'medium'} color={'black'} fontSize={'xl'}>Conversations</Text>
              <ChatCard
                    imageUrl="https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
                    name="John Doe"
                    message="Hello there!"
                  />
                  <ChatCard
                    imageUrl="https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
                    name="John Doe"
                    message="Hello there!"
                  />
              </VStack>
            </Box>

          </Flex>
          </Box>
          <Box>
          <VStack align={"flex-start"}>
          <Text fontWeight={'medium'} color={'black'} fontSize={'xl'}>Projects</Text>
          <Grid container gap={6} templateColumns='repeat(3, 1fr)' width={'100%'}>
            {user &&
              user.creatorProjects.map((project, index) => (
                <Grid item key={index} >
                  <ProjectCard
                    imageUrl="https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                    projectName={project.name}
                    projectLabel={project.projectId}
                    projectDescription={project.description}
                    avatarImages={project.contributorsData.map(contributor => contributor.pic)}
                    projectId = {project._id}
                    />
                </Grid>
              ))}
          </Grid>
          </VStack>
          </Box>

          


        </VStack>
        
      </Box>
      </Flex>
        </Box>
        
      )}
      
      
    </div>
  );
};

export default Profile;
