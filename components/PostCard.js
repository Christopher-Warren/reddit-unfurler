import {
    Card,
    // Image,
    Text,
    useMantineTheme,
    Title,
    Avatar,
    AvatarsGroup,
    Box,
    Center,
    Paper,
    Container,
    Group,
    Button
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowBigTop as ArrowNarrowUp, MessageCircle2, Calendar } from 'tabler-icons-react';
import domtoimage from 'dom-to-image';

import NextImage from 'next/image';

export default function PostCard({ post, ref }) {
    const theme = useMantineTheme();
    const postRef = useRef();

    const [dataUrl, setDataUrl] = useState('');

    const primaryTextColor =
        theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[9];

    const secondaryTextColor =
        theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[9];

    const {
        subreddit,
        title,
        body,
        author,
        upvotes,
        image,
        permalink,
        comments,
        created,
        locked,
        awards
    } = post;

    const RenderAwards = () => {
        const topThree = awards
            .sort((a, b) => a - b)
            .slice(0, 3)
            .map(award => award.icon.url);

        const totalAwards = awards.reduce((acc, award) => acc + award.count, 0);

        if (awards.length === 0) {
            return null;
        }

        return (
            <Center inline style={{ marginLeft: '10px' }}>
                <AvatarsGroup size={20} limit={3} total={topThree < 3 && totalAwards}>
                    {topThree.map(award => {
                        return <Avatar src={award} key={award} />;
                    })}
                </AvatarsGroup>
                <Box style={{ fontWeight: 600, fontSize: '15px', display: 'inline' }}>
                    {totalAwards}
                </Box>
            </Center>
        );
    };

    useEffect(() => {
        domtoimage
            .toPng(postRef.current)
            .then(function (dataUrl) {
                setDataUrl(dataUrl);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }, []);

    console.log('D URL', dataUrl);
    return (
        // Get snapshot of this element
        <Container p="sm">
            {dataUrl && <img src={dataUrl} />}

            <Paper
                style={{ position: 'relative', left: '-200px' }}
                px={'lg'}
                py={'lg'}
                shadow="xl"
                ref={postRef}
            >
                {/* <Card shadow="sm" p="lg">
                    <Card.Section>
                        remove
                        <Image src={image} width={600} alt={title} />
                    </Card.Section>
                </Card> */}
                <Text color={primaryTextColor}>
                    <Group spacing={'xs'}>
                        <Avatar
                            radius={'xl'}
                            // src={'https://i.pravatar.cc/150?img=1'}
                            size={'sm'}
                            style={{ display: 'inline-block' }}
                        />
                        <Text color={primaryTextColor} size="sm" weight="600" component="span">
                            {subreddit}
                        </Text>
                        <Text
                            mx={'-5px'}
                            color={secondaryTextColor}
                            size="xs"
                            weight="200"
                            component="span"
                        >
                            •
                        </Text>

                        <Text
                            style={{ verticalAlign: 'middle', display: 'inline-block' }}
                            size="sm"
                            color={secondaryTextColor}
                            component="span"
                        >
                            Posted by u/{author}
                        </Text>
                    </Group>
                </Text>
                <Title style={{ color: primaryTextColor }} order={4} mt={10}>
                    {title}
                </Title>

                <Box mt={'lg'}>
                    <Center inline>
                        <ArrowNarrowUp size={20} style={{ verticalAlign: 'middle' }} />
                        <Box>{upvotes}</Box>
                    </Center>
                    <Center inline style={{ marginLeft: '10px' }}>
                        <MessageCircle2 size={20} style={{ verticalAlign: 'middle' }} />
                        <Box>{comments}</Box>
                    </Center>
                    <Center inline style={{ marginLeft: '10px' }}>
                        <Calendar size={20} style={{ verticalAlign: 'middle' }} />
                        <Box>{created}</Box>
                    </Center>

                    <RenderAwards />

                    <ReactMarkdown components={{ image: img => console.log(img) }}>
                        {body}
                    </ReactMarkdown>
                </Box>
            </Paper>
        </Container>
    );
}
