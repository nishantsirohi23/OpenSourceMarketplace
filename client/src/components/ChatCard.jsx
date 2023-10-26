import React from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';

const ChatCard = ({ imageUrl, name, message }) => {
 // Replace with your fixed reply

  return (
    <Box width={"100%"}>
        <Flex alignItems="center" mb={4} justifyContent={'space-between'}>
      <Image
        src={imageUrl}
        alt={name}
        boxSize="50px"
        borderRadius="10px"
        borderWidth="2px"
        borderColor="black"
      />
      <Box flex="1" ml={3}>
        <Text fontWeight="bold" fontSize="lg" color={'black'}>
          {name}
        </Text>
        <Text color={'black'}>{message}</Text>
      </Box>
      <Text color="pink.500" fontWeight="bold">
          REPLY
        </Text>
    </Flex>
    </Box>
  );
};

export default ChatCard;
