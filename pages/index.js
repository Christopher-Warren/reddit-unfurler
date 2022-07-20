import {
    Container,
    Button,
    ActionIcon,
    useMantineColorScheme,
    Group,
    MediaQuery,
    useMantineTheme,
    Title
} from '@mantine/core';

import { Sun, MoonStars, BrandReddit, Download } from 'tabler-icons-react';
import PostCard from '../components/PostCard.js';
import usePost from '../hooks/usePost.js';
import RedditLinkInput from '../components/RedditLinkInput.js';

export default function Index() {
    const { post, loading, error, fetchPost } = usePost();

    const getPostAsImage = () => {
        // convert entered post to image
    };

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const dark = colorScheme === 'dark';
    return (
        <Container size={'md'}>
            <Title className="hero" color={theme.colors.indigo}>
                <span className="reddit">reddit</span>
                <br /> as <br />
                image
            </Title>
            <Group align={'end'} id="my-node">
                <MediaQuery smallerThan={'xs'} styles={{ width: '100%', flex: 'none !important' }}>
                    <RedditLinkInput
                        fetchPost={fetchPost}
                        post={post}
                        error={error}
                        loading={loading}
                    />
                </MediaQuery>

                <ActionIcon
                    size={'36px'}
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <Sun size={20} /> : <MoonStars size={20} />}
                </ActionIcon>

                <Button
                    disabled={!post}
                    leftIcon={<BrandReddit size={20} />}
                    onClick={() => getPostAsImage()}
                >
                    Unfurl
                </Button>
            </Group>
            {post && (
                <Container
                    mt={'30px'}
                    p="md"
                    style={{
                        border: '3px solid white',
                        borderRadius: '10px'
                    }}
                >
                    <Container p="sm">
                        <Group position="right">
                            <Button leftIcon={<Download size={16} />} variant="outline">
                                Export
                            </Button>
                        </Group>
                    </Container>
                    <PostCard post={post} />
                </Container>
            )}
        </Container>
    );
}
