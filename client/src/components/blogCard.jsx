'use client'

import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function BlogCard({ category, title, description,img,id }) {
  const [liked, setLiked] = useState(false)
  const displayedCategories = category.slice(0, 3);
  console.log(img);

  const  handleLike = async () => {
    setLiked(!liked)
    const blogId = id
    console.log(blogId)
    const userId = '650745d82068e78a30de2545'
    try{
      const response = await fetch('https://forkfusion.onrender.com/api/blogs/likeblog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            blogId: blogId,
            userId: userId,
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error('Failed to fetch blog:', response.statusText);
        }
    }
    catch(error){
      console.log("the blog cannot be liked",error)
    }
  };

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 pink')}>
        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={
              img
            }
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>
        
        {displayedCategories.map((category, index) => (
            <Box
              key={index}
              bg="black"
              display={'inline-block'}
              px={2}
              py={1}
              color="white"
              mr={2}
              mb={index < 2 ? 2 : 0} // Add margin only for the first two categories
            >
              <Text fontSize={'xs'} fontWeight="medium">
                {category}
              </Text>
            </Box>
          ))}
        
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
            {title}
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            {description}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
        
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Link to={`/blog/${id}`}>
            <Text fontSize={'sm'} fontWeight="bold">
                    Read More
                </Text>
            
            <BsArrowUpRight />
            </Link>
          </Flex>
          
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer"
            onClick={handleLike}>
            {liked ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  )
}