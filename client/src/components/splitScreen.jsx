'use client'

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

export default function SplitScreen() {
  return (
    <Stack  height={'60vh'} maxH={'200vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'pink.400',
                zIndex: -1,
              }}>
              BlogWeb
            </Text>
            <br />{' '}
            <Text color={'pink.400'} as={'span'}>
            Discover, Share, Connect
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          Platform for sharing and discovering a wide range of insightful and engaging blog posts on various topics
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'pink.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Get Started
            </Button>
            <Button rounded={'full'}>How It Works</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://cdn.dribbble.com/users/19849/screenshots/10271497/media/070b8a3d9bcdb880b08bce3db74d7deb.png?resize=1600x1200&vertical=center'
          }
        />

      </Flex>
    </Stack>
  )
}