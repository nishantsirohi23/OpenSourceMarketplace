import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/blogCard';
 // Import your BlogCard component
import { Flex ,Spinner,Text,useBreakpointValue,Container} from '@chakra-ui/react';
import SplitScreen from '../../components/splitScreen';
const CollabContent = () => {
  const [liked, setLiked] = useState({});
  const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    // Fetch blogs from your API using the `/feed` route
    // Update the 'blogs' state with the fetched data
    async function fetchBlogs() {
      try {
        const response = await fetch('https://forkfusion.onrender.com/api/blogs/feed/651fd91ccba17abe014162cf', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Replace with your user ID
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBlogs(data.blogs);
        } else {
          console.error('Failed to fetch blogs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally{
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div>
      <div>
        <SplitScreen />
        <Container maxW="1320px" marginTop={10}>
        <Text
              as={'span'}
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              marginLeft={{ base: '0', md: '5', lg: '7' }}
              position={'relative'}
              >
              Latest Stories of the Day
            </Text>
        {!loading && blogs.length === 0 && <h1>Follow some users to see the feed</h1>}

			{loading && (
				<Flex justify='center'>
					<Spinner size='xl' />
				</Flex>
			)}
      

      
      <Flex overflowX="auto" > {/* Use Flex with horizontal scroll */}
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            category={blog.category}
            title={blog.title}
            description={blog.description}
            img={blog.img}
          />
        ))}
      </Flex>
          </Container>
      </div>
    </div>
  );
};

export default CollabContent;
