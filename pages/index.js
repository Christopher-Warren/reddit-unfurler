import {
    TextInput,
    Container,
    Button,
    ActionIcon,
    useMantineColorScheme,
    Badge,
    Loader
} from '@mantine/core';
import { Sun, MoonStars, AlertCircle, CircleCheck } from 'tabler-icons-react';
import PostCard from '../components/PostCard.js';
import usePost from '../hooks/usePost.js';

export default function Index() {
    const { post, loading, error, fetchPost } = usePost();

    const getPostAsImage = () => {
        // convert entered post to image
    };

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    return (
        <Container>
            <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>

            <TextInput
                onChange={e => fetchPost(e.currentTarget.value)}
                label="Post URL"
                error={error}
                description="Link to the reddit post"
                style={{ width: 400 }}
                styles={{
                    wrapper: { overflow: 'hidden' }
                }}
                mb={10}
                rightSection={
                    <Badge
                        radius={0}
                        p="6px"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderBottomRightRadius: '4px',
                            borderTopRightRadius: '4px'
                        }}
                    >
                        {error && <AlertCircle style={{ display: 'block', opacity: 0.5 }} />}
                        {loading && <Loader style={{ display: 'block', opacity: 0.5 }} />}
                        {post && <CircleCheck style={{ display: 'block', opacity: 0.5 }} />}
                    </Badge>
                }
            />
            <Button mb={20} disabled={!post} onClick={() => getPostAsImage()}>
                Get Post
            </Button>
            {post && <PostCard post={post} />}
        </Container>
    );
}
